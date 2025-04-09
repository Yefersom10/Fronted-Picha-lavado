import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AutosService {
  private apiUrl = 'http://localhost:8080/cars/autos';

  constructor(private http: HttpClient) {}

  // Obtener lista de autos
  getAutos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Agregar auto con ID de usuario (puedes ajustar si se requiere en backend)
  addAuto(autoData: any): Observable<any> {
    const userId = 1; // Cambiar por el ID real del usuario autenticado
    return this.http.post(`${this.apiUrl}/add`, autoData, { withCredentials: true });
  }

  // Eliminar auto
  deleteAuto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Actualizar auto
  updateAuto(auto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${auto.id}`, auto);
  }
}
