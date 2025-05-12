import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommentService, Comment } from '../services/comment.service';

@Component({
  selector: 'app-flight-dashboard',
  templateUrl: './flight-dashboard.component.html',
  styleUrls: ['./flight-dashboard.component.css']
})
export class FlightDashboardComponent implements OnInit {
  // Comments section
  showComments: boolean = false;
  flightComments: Comment[] = [];
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    // Initialize component
    this.loadFlightComments();
  }

  goToLogin() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleComments() {
    this.showComments = !this.showComments;
    if (this.showComments) {
      this.loadFlightComments();
    }
  }

  loadFlightComments() {
    this.commentService.getCommentsByType('vol').subscribe(
      (comments) => {
        this.flightComments = comments;
        this.errorMessage = null;
      },
      (error) => {
        this.errorMessage = 'Error loading flight comments: ' + error.message;
      }
    );
  }
}
