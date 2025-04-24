import { Component } from '@angular/core';
import { ReservaService } from '../../../../service/reserva.service';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { AutosService } from '../../../../service/autos.service';
import { ServicioService } from '../../../../service/servicio.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {
  autos: any[] = [];
  servicios: any[] = [];

  reserva: any = {
    autoId: '',
    servicioId: '',
    fecha: '',
    hora: ''
  };

  constructor(
    private reservaService: ReservaService,
    private autoService: AutosService,
    private servicioService: ServicioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargarAutos();
    this.cargarServicios();
  }

  cargarAutos(): void {
    this.autoService.getAutos().subscribe({
      next: (data) => this.autos = data,
      error: (err) => console.error('Error cargando autos:', err)
    });
  }

  cargarServicios(): void {
    this.servicioService.getAll().subscribe({
      next: (data) => this.servicios = data,
      error: (err) => console.error('Error cargando servicios:', err)
    });
  }

  crearReserva(): void {
    if (!this.reserva.autoId || !this.reserva.servicioId || !this.reserva.fecha || !this.reserva.hora) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    const fechaHora = `${this.reserva.fecha}T${this.reserva.hora}`;

    const reservaPayload = {
      auto: { id: this.reserva.autoId },
      servicio: { id: this.reserva.servicioId },
      fechaReserva: `${this.reserva.fecha}T00:00:00`,
      horaReserva: fechaHora,
      estado: 'PENDIENTE'
    };

    console.log('🛰️ Enviando payload a backend:', reservaPayload);

    this.reservaService.create(reservaPayload).subscribe({
      next: () => {
        alert('✅ Reserva creada con éxito.');
        this.router.navigate(['/pagina-principal']);
      },
      error: (err) => {
        console.error('❌ Error al crear reserva:', err);
        alert('Error al crear reserva: ' + err.error.message);
      }
    });
  }
}
