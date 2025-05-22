import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private baseUrl = 'http://localhost:8082/api/v1/pagos';

  constructor(private http: HttpClient) {}

  getPagos(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  eliminarPago(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

