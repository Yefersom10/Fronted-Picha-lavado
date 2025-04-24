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
    usuarioId: 0,
    autoId: '',
    servicioId: '',
    fecha: '',
    hora: '',
    comentario: ''
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

    this.reserva.usuarioId = parseInt(userId, 10);

    this.cargarAutos();
    this.cargarServicios();
  }

  cargarAutos(): void {
    this.autoService.getAutos().subscribe({
      next: (data) => {
        console.log('🔍 Autos recibidos:', data);
        this.autos = data; // No filtrar, el backend ya devuelve los autos del usuario
      },
      error: (err) => console.error('Error cargando autos:', err)
    });
  }

  cargarServicios(): void {
    this.servicioService.getAll().subscribe({
      next: (data) => {
        console.log('🔧 Servicios cargados:', data);
        this.servicios = data;
      },
      error: (err) => console.error('Error cargando servicios:', err)
    });
  }

  crearReserva(): void {
    if (!this.reserva.autoId || !this.reserva.servicioId || !this.reserva.fecha || !this.reserva.hora) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    this.reservaService.create(this.reserva).subscribe({
      next: () => alert('✅ Reserva creada con éxito.'),
      error: (err) => {
        console.error('❌ Error al crear reserva:', err);
        alert('Error al crear reserva: ' + err.message);
      }
    });
  }
}
