import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8082/auth'; // Base de la URL del backend

  constructor(private http: HttpClient) {}

  login(userId: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/login`, { userId, password });
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }
  checkEmail(email: string): Observable<boolean> {
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/checkEmail?email=${email}`)
      .pipe(map(response => response.exists));
  }
}
