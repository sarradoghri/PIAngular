import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DashboardingService } from '../services/dashboarding.service';
import { CommentService, Comment } from '../services/comment.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  predictedPrice: number | null = null;
  forecast: any[] = [];
  classification: any | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  // Comments section
  showComments: boolean = false;
  magasinComments: Comment[] = [];

  //par defaut
  category: string = 'boisson'; 
  storeId: string = '19';       
  feature1: number = 5.2;       
  feature2: number = 1.3;       

  //Préparation du graphique
  lineChartData: any = { labels: [], datasets: [] };
  lineChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantity Sold'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time/Period'
        }
      }
    }
  };

  //Injecte le service pour effectuer les appels API
  constructor(
    private dashboardingService: DashboardingService,
    private router: Router,
    private authService: AuthService,
    private commentService: CommentService
  ) {}

  //Appelle automatiquement les 3 méthodes 
  ngOnInit() {
    this.predictPrice();
    this.getForecast();
    this.classifyProduct();
    this.loadComments(); // Load comments on startup
    this.showComments = true; // Show comments section by default
  }

  predictPrice() {
    this.dashboardingService.predictPrice(this.category, this.storeId).subscribe(
      (response) => {
        this.predictedPrice = response.prix_unitaire_estime;
        this.errorMessage = null;
      },
      (error) => {
        this.errorMessage = 'Error predicting price: ' + error.message;
      }
    );
  }

  getForecast() {
    this.dashboardingService.forecastSales().subscribe(
      (response) => {
        this.forecast = response.forecast;
        this.updateChart();
        this.errorMessage = null;
      },
      (error) => {
        this.errorMessage = 'Error getting forecast: ' + error.message;
      }
    );
  }

  classifyProduct() {
    const features = [this.feature1, this.feature2];
    this.dashboardingService.classifyProduct(features).subscribe(
      (response) => {
        this.classification = response;
        this.errorMessage = null;
      },
      (error) => {
        this.errorMessage = 'Error classifying product: ' + error.message;
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  updateChart() {
    if (this.forecast.length > 0) {
      this.lineChartData = {
        labels: this.forecast.map(item => item[0]),
        datasets: [{
          label: 'Sales Estimate (Units)',
          data: this.forecast.map(item => item[1]),
          fill: false,
          borderColor: '#36A2EB',
          tension: 0.1
        }]
      };
    }
  }

  toggleComments() {
    this.showComments = !this.showComments;
    if (this.showComments) {
      this.loadComments();
    }
  }

  loadComments() {
    this.commentService.getCommentsByType('magasin').subscribe(
      (comments: Comment[]) => {
        this.magasinComments = comments;
        this.errorMessage = null;
      },
      (error: any) => {
        this.errorMessage = 'Error loading comments: ' + error.message;
      }
    );
  }


}