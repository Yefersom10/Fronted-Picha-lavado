import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private baseUrl = 'http://localhost:8082/api/facturas';

  constructor(private http: HttpClient) {}

  getFacturas(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  eliminarFactura(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
