import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AutosService {
  private apiUrl = 'http://localhost:8082/api/autos';

  constructor(private http: HttpClient) {}

  getAutos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list`, { withCredentials: true });
  }

  addAuto(auto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, auto, { withCredentials: true });
  }

  updateAuto(id: number, auto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, auto, { withCredentials: true });
  }

  deleteAuto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  getAutoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
