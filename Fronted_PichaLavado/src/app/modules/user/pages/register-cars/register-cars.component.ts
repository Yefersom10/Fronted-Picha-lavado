import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutosService } from '../../../../service/autos.service';

@Component({
  selector: 'app-register-cars',
  imports: [],
  templateUrl: './register-cars.component.html',
  styleUrl: './register-cars.component.css'
})
export class RegisterCarsComponent {
  
  carForm: FormGroup;
  submitted = false;
  vehicleTypes = ['SEDAN', 'SUV', 'HATCHBACK', 'PICKUP', 'COUPE', 'MINIVAN', 'CONVERTIBLE', 'OTRO'];

  constructor(private fb: FormBuilder, private autosService: AutosService) {
    this.carForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(2025)]],
      placa: ['', Validators.required],
      color: ['', Validators.required],
      tipoDeVehiculo: ['', Validators.required]
    });
  }

  registerCar() {
    this.submitted = true;

    if (this.carForm.valid) {
      this.autosService.addAuto(this.carForm.value).subscribe({
        next: (res) => {
          console.log('Auto registrado con éxito:', res);
          alert('Vehículo registrado exitosamente.');
          this.carForm.reset();
          this.submitted = false;
        },
        error: (err) => {
          console.error('Error al registrar auto:', err);
          alert('Hubo un error al registrar el vehículo.');
        }
      });
    }
  }
}
