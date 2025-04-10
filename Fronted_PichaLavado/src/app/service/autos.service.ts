import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AutosService {
<<<<<<< HEAD
  private apiUrl = 'http://localhost:8082/api/autos';
=======
  private apiUrl = 'http://localhost:8080/cars/autos';
>>>>>>> bba4a061c48b4e7c7a1ff12d579db7a51f70f9f8

  constructor(private http: HttpClient) {}

  // Obtener lista de autos
  getAutos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list`, { withCredentials: true });
  }

<<<<<<< HEAD
  addAuto(auto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, auto, { withCredentials: true });
  }

  updateAuto(id: number, auto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, auto, { withCredentials: true });
=======
  // Agregar auto con ID de usuario (puedes ajustar si se requiere en backend)
  addAuto(autoData: any): Observable<any> {
    const userId = 1; // Cambiar por el ID real del usuario autenticado
    return this.http.post(`${this.apiUrl}/add`, autoData, { withCredentials: true });
>>>>>>> bba4a061c48b4e7c7a1ff12d579db7a51f70f9f8
  }

  // Eliminar auto
  deleteAuto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

<<<<<<< HEAD
  getAutoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { withCredentials: true });
=======
  // Actualizar auto
  updateAuto(auto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${auto.id}`, auto);
>>>>>>> bba4a061c48b4e7c7a1ff12d579db7a51f70f9f8
  }
}
