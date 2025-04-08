import { Injectable } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {
  
  private apiUrlAuth = 'http://localhost:8082/auth';
  private apiUrlUsers = 'http://localhost:8082'; 

  constructor(private http: HttpClient) {} 
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrlAuth}/login`, { email, password }, { withCredentials: true });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get('http://localhost:8082/auth/current', {
      withCredentials: true
    });
  }

  logout() {
    return this.http.post(`${this.apiUrlAuth}/logout`, {}, { withCredentials: true });
  }

  checkSession() {
    return this.http.get(`${this.apiUrlAuth}/checkSession`, { withCredentials: true });
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlAuth}/register`, userData);
  }

  checkEmail(email: string): Observable<boolean> {
    return this.http.get<{ exists: boolean }>(`${this.apiUrlAuth}/checkEmail?email=${email}`)
      .pipe(map(response => response.exists));
  }

  forgotPasswordAuth(email: string, telefono: string): Observable<any> {
    return this.http.post(`${this.apiUrlAuth}/forgot-password`, { email, telefono });
  }

  forgotPasswordUsers(email: string, telefono: string): Observable<any> {
    return this.http.post(`${this.apiUrlUsers}/forgot-password`, { email, telefono });
  }

}
