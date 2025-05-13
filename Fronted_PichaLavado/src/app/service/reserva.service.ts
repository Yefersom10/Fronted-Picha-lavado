import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private apiUrl = 'http://localhost:8082/api/reservas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getByUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  create(reserva: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reserva);
  }

  update(reserva: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${reserva.id}`, reserva);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  cambiarEstado(id: number, nuevoEstado: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, nuevoEstado);
  }

}
