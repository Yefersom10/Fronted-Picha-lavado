import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FacturaReporte } from '../models/factura-reporte.dto';

@Injectable({
  providedIn: 'root'
})
export class FacturaReporteService {
  private apiUrl = 'http://localhost:8082/api/v1/reportes'; // Asegúrate de tener tu backend en esta ruta


 constructor(private http: HttpClient) {}

  

  descargarReportePDF(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/reporte/pdf`, { responseType: 'blob' });
  }

  descargarReporteExcel(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/reporte/excel`, { responseType: 'blob' });
  }
    obtenerReporteFacturas(): Observable<FacturaReporte[]> {
    return this.http.get<FacturaReporte[]>(this.apiUrl + '/reporte');
  }
}
