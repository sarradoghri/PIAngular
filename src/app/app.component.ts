import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, private router: Router) {}

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Get the user's name from the session
  getUserName(): string | null {
    return this.authService.getUserName();
  }

  // Logout user
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
