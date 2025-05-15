import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../modules/user/pages/factura/factura.model';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private apiUrl = 'http://localhost:8082/api/reservas';

  constructor(private http: HttpClient) { }

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
  confirmarPago(id: number): Observable<any> {
    return this.http.post<any>(`http://localhost:8082/api/v1/reservas/${id}/confirmar-pago`, {});
  }
  getFacturaPorReserva(reservaId: number): Observable<any> {
    return this.http.get(`http://localhost:8082/api/v1/facturas/reserva/${reservaId}`);
  }

  generarFactura(reservaId: number): Observable<any> {
    return this.http.post(`http://localhost:8082/api/v1/facturas/generar/${reservaId}`, {});
  }
  obtenerMisReservas(userId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/mis-reservas?userId=${userId}`);
  }
  getFacturaPorReservaYUsuario(reservaId: number, userId: number) {
  return this.http.get<Factura>(`http://localhost:8082/api/v1/facturas/reserva/${reservaId}/usuario/${userId}`);
}

}
