import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/login'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  login(userId: string, password: string): Observable<string> {
    return this.http.post<string>(this.apiUrl, { userId, password });
  }

  
}
