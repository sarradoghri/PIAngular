import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardingService } from '../services/dashboarding.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  recommendations: any[] = [];
  errorMessage: string | null = null;

  // Form inputs
  productName: string = 'Eau';  // Default product name
  budget: number = 50;          // Default budget

  // Chart data for recommendations
  barChartData: any = { labels: [], datasets: [] };
  barChartOptions = {
    responsive: true,
    scales: { y: { beginAtZero: true } }
  };

  constructor(
    private dashboardingService: DashboardingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRecommendations();
  }

  getRecommendations() {
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
  
}