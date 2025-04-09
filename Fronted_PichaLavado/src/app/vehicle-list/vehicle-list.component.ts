import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AutosService } from '../service/autos.service';
import { AutosComponent } from '../modules/admin/autos/autos.component';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit, OnDestroy {
  vehicles: AutosComponent[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private autosService: AutosService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.checkSession()) {
      this.loadVehicles();
    } else {
      this.errorMessage = 'Debes iniciar sesión para ver tus vehículos';
      this.router.navigate(['/login']);  // Redirige al login si no está autenticado
    }
    
    // Escuchar el evento cuando se agrega un vehículo
    window.addEventListener('vehicle-added', this.loadVehicles.bind(this));
  }

  ngOnDestroy(): void {
    // Eliminar el event listener al destruir el componente
    window.removeEventListener('vehicle-added', this.loadVehicles.bind(this));
  }

  loadVehicles(): void {
    if (!this.authService.checkSession()) {
      this.errorMessage = 'Debes iniciar sesión para ver tus vehículos';
      return;
    }
    
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
        if (error.status === 401) {
          this.errorMessage = 'Sesión no válida. Por favor, inicia sesión nuevamente.';
          this.router.navigate(['/login']);  // Redirige a login en caso de sesión no válida
        } else {
          this.errorMessage = 'Error al cargar los vehículos. Por favor, intenta nuevamente.';
        }
      }
    });
  }

  deleteVehicle(id: number): void {
    if (confirm('¿Está seguro de eliminar este vehículo?')) {
      this.autosService.deleteAuto(id).subscribe({
        next: () => {
          this.loadVehicles();
        },
        error: (error) => {
          console.error('Error al eliminar el vehículo', error);
          if (error.status === 401) {
            this.errorMessage = 'Sesión no válida. Por favor, inicia sesión nuevamente.';
            this.router.navigate(['/login']);
          } else if (error.status === 403) {
            this.errorMessage = 'No tienes permiso para eliminar este vehículo.';
          } else {
            this.errorMessage = 'Error al eliminar el vehículo. Por favor, intenta nuevamente.';
          }
        }
      });
    }
  }
}
