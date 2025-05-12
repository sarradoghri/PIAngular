import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly VALID_CREDENTIALS = [
    { email: 'sarra.doghri@esprit.tn', role: 'store', name: 'Sarra Doghri' },
    { email: 'aziz.bessgaire@esprit.tn', role: 'hotel', name: 'Aziz Bessgaire' },
    { email: 'amine.tayechi@esprit.tn', role: 'flight', name: 'Amine Tayechi' }
  ];

  private readonly VALID_PASSWORD = 'esprit2025';

  constructor() { }

  login(credentials: { email: string; password: string }): Observable<any> {
    const user = this.VALID_CREDENTIALS.find(u => u.email === credentials.email);
    
    if (user && credentials.password === this.VALID_PASSWORD) {
      return of({
        token: 'dummy-token-' + user.role,
        role: user.role,
        name: user.name
      });
    }
    
    return new Observable(subscriber => {
      subscriber.error('Invalid credentials');
    });
  }
  // Store the token and other user details
  setSession(authResult: any): void {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('role', authResult.role); // Store the role
    localStorage.setItem('userName', authResult.name); // Store the user's name
  }

  // Get the stored token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Get the user's role
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Get the user's name
  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  // Logout by clearing the session data
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
  }
}
