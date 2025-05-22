import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private baseUrl = 'http://localhost:8082/api/v1/facturas';

  constructor(private http: HttpClient) {}

  getFacturas(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  eliminarFactura(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  descargarPdf() {
    return this.http.get(`${this.baseUrl}/pdf`, {
      responseType: 'blob' // Muy importante
    });
  }

  // Para obtener Excel
  descargarExcel() {
    return this.http.get(`${this.baseUrl}/excel`, {
      responseType: 'blob'
    });
  }
  
}
