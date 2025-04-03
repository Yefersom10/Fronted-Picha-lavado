import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  private apiUrl = 'http://localhost:8080/cars/autos';

  constructor(private http: HttpClient) {}

  // Obtener autos del usuario autenticado
  getAutos(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { withCredentials: true });
  }

  // Agregar un auto
  addAuto(auto: any): Observable<any> {
    return this.http.post('http://localhost:8080/cars/autos/add', auto, { withCredentials: true });
  }

  // Obtener un auto por ID
  getAutoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  // Actualizar un auto
  updateAuto(id: number, auto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/put/${id}`, auto, { withCredentials: true });
  }

  // Eliminar un auto
  deleteAuto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { withCredentials: true });
  }
}
