import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { ReservaService } from '../../../service/reserva.service';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';

@Component({
  selector: 'app-reserva-admin',
  imports: [ CommonModule, FormsModule, NavbarAdminComponent ],
  templateUrl: './reserva-admin.component.html',
  styleUrl: './reserva-admin.component.css'
})
export class ReservaAdminComponent implements OnInit {
  reservas: any[] = [];
  estados: string[] = ['PENDIENTE', 'CONFIRMADA', 'CANCELADA']; // ejemplo de estados
  filtro: string = '';

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas() {
    this.reservaService.getAll().subscribe(data => {
      this.reservas = data;
    });
  }

  eliminarReserva(id: number) {
    this.reservaService.delete(id).subscribe(() => {
      this.reservas = this.reservas.filter(r => r.id !== id);
    });
  }

  cambiarEstado(reserva: any) {
  const nuevoEstado = reserva.estado;  // Se asume que 'estado' es un string de los valores válidos
  this.reservaService.cambiarEstado(reserva.id, nuevoEstado).subscribe(() => {
    alert('Estado actualizado');
    this.cargarReservas();  // Recargar las reservas para ver el cambio reflejado
  }, error => {
    alert('Error al actualizar el estado');
  });
}
}
