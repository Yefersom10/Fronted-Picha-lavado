import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AutosService {
  private apiUrl = 'http://localhost:8080/cars';

  constructor(private http: HttpClient) {}

  getAutos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addAuto(auto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, auto);
  }

  deleteAuto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Puedes agregar también un update si lo usas
  updateAuto(auto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${auto.id}`, auto);
  }
}
