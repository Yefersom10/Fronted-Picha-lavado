import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../service/auth.service';
import { AutosService } from '../../../../service/autos.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';

// Creamos una interfaz correcta para el modelo de Auto
interface Auto {
  marca: string;
  modelo: string;
  anio: number;
  placa: string;
  color: string;
  tipoDeVehiculo: string;
}

@Component({
  selector: 'app-register-cars',
  imports: [ReactiveFormsModule, CommonModule,NavbarComponent],
  standalone: true,
  templateUrl: './register-cars.component.html',
  styleUrls: ['./register-cars.component.css']
})
export class RegisterCarsComponent implements OnInit {
  carForm: FormGroup;
  tiposDeVehiculo = ['Carro', 'Moto', 'Camión', 'Bus', 'Van', 'Otro'];
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
    this.currentYear = new Date().getFullYear();
    this.maxYear = this.currentYear + 1;
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
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(this.maxYear)]],
      placa: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{3,8}$/)]],
      color: ['', Validators.required],
      tipoDeVehiculo: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.carForm.valid && this.authService.checkSession()) {
      this.isSubmitting = true;
      this.errorMessage = '';
  
      const vehicle: Auto = {
        ...this.carForm.value,
        userId: this.authService.checkSession() // Agregar el userId
      };
  
      this.autosService.addAuto(vehicle).subscribe({
        next: (response) => {
          console.log('Vehículo registrado con éxito', response);
          this.carForm.reset();
          this.isSubmitting = false;
          window.dispatchEvent(new Event('vehicle-added'));
          this.router.navigate(['/vehicle-list']);
        },
        error: (error) => {
          console.error('Error al registrar el vehículo', error);
          this.isSubmitting = false;
          if (error.status === 401) {
            this.errorMessage = 'Sesión no válida. Por favor, inicia sesión nuevamente.';
            this.router.navigate(['/login']);
          } else {
this.errorMessage = "error al registrar el vehiculo"          }
        }
      });
    } else {
      this.carForm.markAllAsTouched();
      if (!this.authService.checkSession()) {
        this.errorMessage = 'Debes iniciar sesión para registrar un vehículo';
        this.router.navigate(['/login']);
      }
    }
  }
  
  registerCar() {
    if (this.carForm.valid) {
      const vehicle = this.carForm.value;
  
      // Intentar registrar el vehículo a través de la API
      this.autosService.addAuto(vehicle).subscribe({
        next: () => {
          // Redirigir a la lista de vehículos tras el éxito
          this.router.navigate(['/vehicle-list']);
        },
        error: (error) => {
          console.error('Error al comunicarse con la API:', error);
  
          // Como respaldo, almacenar el vehículo en localStorage
          const vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
          vehicles.push(vehicle);
          localStorage.setItem('vehicles', JSON.stringify(vehicles));
  
          // Redirigir a la lista de vehículos
          this.router.navigate(['/vehicle-list']);
        }
      });
    }
  }
  
}