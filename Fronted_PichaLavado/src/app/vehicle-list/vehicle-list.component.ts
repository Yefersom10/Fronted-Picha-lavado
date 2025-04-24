import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AutosService } from '../service/autos.service';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

interface Auto {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  placa: string;
  color: string;
  tipoDeVehiculo: string;
}

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, RouterLink,NavbarComponent],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent {

  vehicles: Auto[] = [];
  loading = false;
  errorMessage = '';

  constructor(private autosService: AutosService, private router: Router) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.loading = true;
    this.errorMessage = '';

    this.autosService.getAutos().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar los vehículos', error);
        this.loading = false;
        this.errorMessage = 'Error al cargar los vehículos. Por favor, intenta nuevamente.';
      }
    });
  }

  deleteVehicle(id: number): void {
    if (confirm('¿Está seguro de eliminar este vehículo?')) {
      this.autosService.deleteAuto(id).subscribe({
        next: () => {
          this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
        },
        error: (error) => {
          console.error('Error al eliminar el vehículo', error);
          this.errorMessage = 'Error al eliminar el vehículo. Por favor, intenta nuevamente.';
        }
      });
    }
  }
}
