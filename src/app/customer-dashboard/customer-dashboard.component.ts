import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommentService, Comment, CommentData } from '../services/comment.service';
import { DashboardingService } from '../services/dashboarding.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  recommendations: any[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;
  commentError: string | null = null;
  showComments: boolean = false;
  targetType: 'Store' | 'Hotel' | 'Flight' = 'Store';
  commentText: string = '';
  targetId: string = '';
  customerNumber: number = 0;
  productName: string = '';
  budget: number = 0;


  // Current user
  currentUser: any = null;

  // Chart data for recommendations
  barChartData: any = { labels: [], datasets: [] };
  barChartOptions: any = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private commentService: CommentService,
    private dashboardingService: DashboardingService
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit() {
    this.getRecommendations();
    this.getLatestCustomerNumber();
  }

  getLatestCustomerNumber() {
    // Convert the new target type values to backend values
    const backendType = this.targetType.toLowerCase() === 'store' ? 'magasin' : 
                       this.targetType.toLowerCase() === 'flight' ? 'vol' : 'hotel';

    this.commentService.getCommentsByType(backendType).subscribe(
      (comments: Comment[]) => {
        // Find the highest customer number from existing comments
        const maxNumber = Math.max(...comments.map(c => parseInt(c.target_id) || 0), 0);
        this.customerNumber = maxNumber;
      },
      (error) => {
        console.error('Error fetching comments:', error);
        this.customerNumber = 0;
      }
    );
  }

  getRecommendations() {
    if (!this.productName || !this.budget) {
      this.errorMessage = 'Please enter both product name and budget';
      this.recommendations = [];
      return;
    }

    this.dashboardingService.recommendProducts(this.productName, this.budget).subscribe(
      (response) => {
        console.log('Recommendations:', response);
        
        this.recommendations = response;
        this.updateChart();
        this.errorMessage = null;
      },
      (error) => {
        this.errorMessage = 'Error getting recommendations: ' + error.message;
      }
    );
  }

  goToLogin() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  updateChart() {
    if (this.recommendations.length > 0) {
      // Sort recommendations by descending price
      const sorted = [...this.recommendations].sort((a, b) => b.Prix_Unitaire - a.Prix_Unitaire);
  
      this.barChartData = {
        labels: sorted.map(rec => rec.Nom_Produit),
        datasets: [{
          label: 'Price (TND)',
          data: sorted.map(rec => rec.Prix_Unitaire),
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
      };
    }
  }

  submitComment() {
    if (!this.commentText.trim()) {
      this.commentError = 'Please enter a comment';
      return;
    }

    if (!this.targetType) {
      this.commentError = 'Please select what you are commenting on';
      return;
    }

    // Get the latest customer number first
    this.getLatestCustomerNumber();

    // Convert the target type to backend value
    const backendType = this.targetType.toLowerCase() === 'store' ? 'magasin' : 
                       this.targetType.toLowerCase() === 'flight' ? 'vol' : 'hotel';

    // Increment customer number for new comment
    this.customerNumber++;

    const commentData: CommentData = {
      customer_id: 'customer', // Use a default customer ID since no login is required
      target_type: backendType as 'magasin' | 'hotel' | 'vol',
      target_id: this.customerNumber.toString(),
      comment: this.commentText.trim()
    };

    this.commentService.addComment(commentData).subscribe(
      (response) => {
        this.successMessage = 'Feedback added successfully!';
        this.commentError = null;
        this.commentText = ''; // Reset the form
      },
      (error: any) => {
        this.commentError = 'Error adding feedback: ' + error.message;
        this.successMessage = null;
        // Reset customer number on error
        this.customerNumber--;
      }
    );
  }


  onTargetTypeChange(type: 'Store' | 'Hotel' | 'Flight') {
    this.targetType = type;
  }
}