import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../service/auth.service';
import { AutosService } from '../../../../service/autos.service';
import { AutosComponent } from '../../../admin/autos/autos.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-cars',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './register-cars.component.html',
  styleUrls: ['./register-cars.component.css']
})
export class RegisterCarsComponent implements OnInit {
  carForm: FormGroup;
  tiposDeVehiculo = ['Sedan', 'SUV', 'Pickup', 'Hatchback', 'Deportivo', 'Camioneta', 'Otro'];
  errorMessage: string = '';
  isSubmitting = false;
  currentYear: number;
  maxYear: number;

  constructor(
    private fb: FormBuilder,
    private autosService: AutosService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();  // Obtener el año actual
    this.maxYear = this.currentYear + 1;  // Año máximo permitido (el próximo año)
    this.initForm();

    if (!this.authService.checkSession()) {
      this.errorMessage = 'Debes iniciar sesión para registrar un vehículo';
      this.router.navigate(['/login']);
    }
  }

  initForm(): void {
    this.carForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(this.maxYear)]],  // Usar maxYear
      placa: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{3,8}$/)]],
      color: ['', Validators.required],
      tipoDeVehiculo: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.carForm.valid && this.authService.checkSession()) {
      this.isSubmitting = true;
      this.errorMessage = '';

      const vehicle: AutosComponent = this.carForm.value;

      this.autosService.addAuto(vehicle).subscribe({
        next: (response) => {
          console.log('Vehículo registrado con éxito', response);
          this.carForm.reset();
          this.isSubmitting = false;

          // Emitir evento para actualizar la lista de vehículos
          window.dispatchEvent(new CustomEvent('vehicle-added'));
        },
        error: (error) => {
          console.error('Error al registrar el vehículo', error);
          this.isSubmitting = false;
          if (error.status === 401) {
            this.errorMessage = 'Sesión no válida. Por favor, inicia sesión nuevamente.';
          } else {
            this.errorMessage = 'Error al registrar el vehículo. Por favor, intenta nuevamente.';
          }
        }
      });
    } else {
      this.carForm.markAllAsTouched();
      if (!this.authService.checkSession()) {
        this.errorMessage = 'Debes iniciar sesión para registrar un vehículo';
      }
    }
  }

  registerCar() {
    if (this.carForm.valid) {
      const vehicle = this.carForm.value;

      // Obtener lista actual de vehículos desde localStorage
      const vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');

      // Agregar el nuevo vehículo
      vehicles.push(vehicle);

      // Guardar lista actualizada
      localStorage.setItem('vehicles', JSON.stringify(vehicles));

      // Redirigir a la lista
      window.location.href = 'http://localhost:4200/vehicle-list'; // o usa router.navigate si prefieres
    }
  }
}
