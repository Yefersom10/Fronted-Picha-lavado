import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AutosService {
  private apiUrl = 'http://localhost:8082/cars';

  constructor(private http: HttpClient) {}

  addAuto(autoData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/autos/add`, autoData, { withCredentials: true }).pipe(
      catchError(error => {
        console.error('Error al agregar el auto:', error);
        throw error;
      })
    );
  }
  
  getAutos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/autos`, { withCredentials: true });
  }

  
   // Eliminar un auto
   deleteAuto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/autos/delete/${id}`, { withCredentials: true });
  }

  // Actualizar un auto
  updateAuto(auto: any, editingAuto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/autos/put/${auto.id}`, auto, { withCredentials: true });
  }
}
