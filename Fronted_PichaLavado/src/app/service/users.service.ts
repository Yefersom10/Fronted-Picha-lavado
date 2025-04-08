import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8082/users';

   getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  create(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  update(usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${usuario.id}`, usuario);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
