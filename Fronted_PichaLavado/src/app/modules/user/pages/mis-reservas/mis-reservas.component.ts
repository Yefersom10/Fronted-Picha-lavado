import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../../../service/reserva.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-mis-reservas',
  imports: [CommonModule, FormsModule,NavbarComponent],
  templateUrl: './mis-reservas.component.html',
  styleUrl: './mis-reservas.component.css'
})
export class MisReservasComponent implements OnInit {
 reservas: any[] = [];

  constructor(
    private reservaService: ReservaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.error('No hay userId en sessionStorage');
      return;
    }
    this.reservaService.obtenerMisReservas(userId).subscribe({
      next: (data) => this.reservas = data,
      error: (err) => console.error('Error cargando reservas', err),
    });
  }

  verDetalle(reserva: any): void {
  console.log('Reserva seleccionada:', reserva);  // Verifica si tiene id
  this.router.navigate(['/factura', reserva.id]); // Este debe estar definido
}
}
