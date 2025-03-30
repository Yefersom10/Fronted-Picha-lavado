import { Injectable } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Esto hace que AuthService esté disponible globalmente
})
export class AuthService {
  private apiUrl = 'http://localhost:8082/auth'; // Base de la URL del backend

  constructor(private http: HttpClient) {} // Aquí inyectamos HttpClient correctamente

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

  forgotPassword(requestBody: { email: string, telefono: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, requestBody);
  }
  getEmailByToken(token: string): Observable<{ email: string }> {
    return this.http.get<{ email: string }>(`${this.apiUrl}/get-email-by-token?token=${token}`);
  }
  
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword });
  }
}
