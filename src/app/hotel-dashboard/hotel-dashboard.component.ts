import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommentService, Comment } from '../services/comment.service';

@Component({
  selector: 'app-hotel-dashboard',
  templateUrl: './hotel-dashboard.component.html',
  styleUrls: ['./hotel-dashboard.component.css']
})
export class HotelDashboardComponent implements OnInit {
  // Comments section
  showComments: boolean = false;
  hotelComments: Comment[] = [];
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    // Initialize component
    this.loadHotelComments();
  }

  goToLogin() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleComments() {
    this.showComments = !this.showComments;
    if (this.showComments) {
      this.loadHotelComments();
    }
  }

  loadHotelComments() {
    this.commentService.getCommentsByType('hotel').subscribe(
      (comments) => {
        this.hotelComments = comments;
        this.errorMessage = null;
      },
      (error) => {
        this.errorMessage = 'Error loading hotel comments: ' + error.message;
      }
    );
  }
}
