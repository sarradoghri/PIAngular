import { Injectable } from '@angular/core';

export interface User {
  id: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private userEmail: string | null = null;

  login(email: string) {
    this.loggedIn = true;
    this.userEmail = email;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
  }

  logout() {
    this.loggedIn = false;
    this.userEmail = null;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  getCurrentUser(): User | null {
    const email = this.getUserEmail();
    if (!email) return null;
    
    // Using email as ID since we don't have a separate ID field
    return {
      id: email,
      email: email
    };
  }

  canAccessDashboard(route: string): boolean {
    const email = this.getUserEmail();
    if (!email) return false;

    switch (route) {
      case 'admin-dashboard':
        return email === 'sarra.doghri@esprit.tn';
      case 'hotel-dashboard':
        return email === 'aziz.bessgaire@esprit.tn';
      case 'flight-dashboard':
        return email === 'amine.tayechi@esprit.tn';
      case 'customer-dashboard':
        return email.endsWith('@esprit.tn') && 
               email !== 'sarra.doghri@esprit.tn' && 
               email !== 'aziz.bessgaire@esprit.tn' && 
               email !== 'amine.tayechi@esprit.tn';
      default:
        return false;
    }
  }
}
