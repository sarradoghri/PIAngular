import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CommentData {
  customer_id: string;
  target_type: 'magasin' | 'hotel' | 'vol';
  target_id: string;
  comment: string;
}

export interface Comment {
  target_id: string;
  comment: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:5000'; // Adjust this to match your Flask backend URL

  constructor(private http: HttpClient) { }

  addComment(comment: CommentData): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/add_comment`, comment);
  }

  getCommentsByType(targetType: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/api/get_comments_by_type/${targetType}`);
  }
}
