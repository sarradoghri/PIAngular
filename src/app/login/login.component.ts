import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    // Check if password matches
    if (this.password !== 'esprit2025') {
      this.errorMessage = 'Invalid password';
      return;
    }

    // Check special users first
    if (this.email === 'sarra.doghri@esprit.tn') {
      this.authService.login(this.email);
      this.router.navigate(['/admin-dashboard']);
      return;
    } else if (this.email === 'aziz.bessgaire@esprit.tn') {
      this.authService.login(this.email);
      this.router.navigate(['/hotel-dashboard']);
      return;
    } else if (this.email === 'amine.tayechi@esprit.tn') {
      this.authService.login(this.email);
      this.router.navigate(['/flight-dashboard']);
      return;
    }

    // For all other users, go to customer dashboard without login
    this.router.navigate(['/customer-dashboard']);
  }
}
