import { Component, OnInit } from '@angular/core';
import { AutosService } from '../service/autos.service';
import { Router, RouterLink } from '@angular/router';

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
  imports: [RouterLink],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
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
          this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id); // Actualiza la lista localmente
        },
        error: (error) => {
          console.error('Error al eliminar el vehículo', error);
          this.errorMessage = 'Error al eliminar el vehículo. Por favor, intenta nuevamente.';
        }
      });
    }
  }
}
