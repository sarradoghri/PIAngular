import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardingService {
  private baseUrl = 'http://localhost:5000'; // JSON server URL as specified

  constructor(private http: HttpClient) { }

  // Customer Dashboard APIs
  predictPrice(Categorie_Produit: string, Id_Magazin: string): Observable<any> {
    const body = new HttpParams()
      .set('Categorie_Produit', Categorie_Produit)
      .set('Id_Magazin', Id_Magazin);
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  
    return this.http.post(`${this.baseUrl}/predict`, body.toString(), { headers });
  }

  recommendProducts(nom_produit: string, budget_max: number): Observable<any> {
    const body = {
      nom_produit: nom_produit,
      budget_max: budget_max
    };
  
    return this.http.post(`${this.baseUrl}/recommander`, body);
  }

  // Admin Dashboard APIs
  forecastSales(): Observable<any> {
    return this.http.get(`${this.baseUrl}/forecast`);
  }

  classifyProduct(features: number[]): Observable<any> {
    const body = {
      features: features
    };
  
    return this.http.post(`${this.baseUrl}/classif`, body);
  } 
}