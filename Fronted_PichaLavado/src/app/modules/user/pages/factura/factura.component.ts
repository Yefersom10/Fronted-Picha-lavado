import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Factura } from './factura.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReservaService } from '../../../../service/reserva.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-factura',
  imports: [ CommonModule,RouterLink],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent {
  factura?: Factura;
  errorMessage: string = '';
  clienteNombre: string = '';
  clienteId: number = 0;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.obtenerClienteDesdeStorage();
    this.cargarFactura();
  }

  obtenerClienteDesdeStorage(): void {
    const userId = sessionStorage.getItem('userId');
    const userName = sessionStorage.getItem('userName');

    if (userId && userName) {
      this.clienteId = parseInt(userId, 10);
      this.clienteNombre = userName;
    }
  }

  cargarFactura(): void {
    this.route.paramMap.subscribe(params => {
      const reservaId = params.get('id');
      if (reservaId) {
        this.http.get<Factura>(`http://localhost:8082/api/v1/facturas/reserva/${reservaId}`)
          .subscribe({
            next: (data) => this.factura = data,
            error: (err) => {
              console.error('Error al cargar factura:', err);
              this.errorMessage = 'No se pudo cargar la factura.';
            }
          });
      }
    });
  }
}
