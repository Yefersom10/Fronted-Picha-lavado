import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServicioService {

   private apiUrl = 'http://localhost:8082/api/servicios';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list/servicios`);
  }

  create(servicio: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add/servicios`, servicio, { withCredentials: true });
  }

  update(servicio: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${servicio.id}`, servicio);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
