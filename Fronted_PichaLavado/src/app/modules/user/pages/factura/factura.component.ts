import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Factura } from './factura.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReservaService } from '../../../../service/reserva.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-factura',
  imports: [CommonModule, RouterLink],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent {
  factura?: Factura;
  errorMessage: string = '';
  clienteNombre: string = '';
  clienteId: number = 0;
  mostrarFormulario: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

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
  metodoPago = 'tarjeta'; // valor por defecto

pagarReserva() {
  const reservaId = this.factura.id;

  this.http.post(`http://localhost:8082/api/reservas/${reservaId}/confirmar-pago`, null, { responseType: 'json' })
    .subscribe({
      next: (resp) => {
        console.log('Pago exitoso', resp);
        alert('PAGO EXITOSO');
        this.router.navigate(['/pagina-principal']);  // Redirige a página principal
      },
      error: (err) => console.error('Error al pagar reserva:', err)
    });
  }


  abrirFormularioPago() {
    // Puedes mostrar un modal, alert o redirigir a una página
    this.mostrarFormulario = true;
  }


}
