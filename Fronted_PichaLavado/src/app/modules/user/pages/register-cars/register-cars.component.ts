import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutosService } from '../../../../service/autos.service';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-cars',
  imports: [NavbarComponent,CommonModule, ReactiveFormsModule],
  templateUrl: './register-cars.component.html',
  styleUrl: './register-cars.component.css'
})
export class RegisterCarsComponent {
  
  carForm: FormGroup;

  tiposDeVehiculo: string[] = ['Carro', 'Moto', 'Camión', 'Bus', 'Van', 'Otro'];


  constructor(
    private fb: FormBuilder,
    private autosService: AutosService,
    private router: Router
  ) {
    this.carForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      placa: ['', Validators.required],
      color: ['', Validators.required],
      tipoDeVehiculo: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log("Enviando formulario...");
  
    if (this.carForm.invalid) {
      console.warn("Formulario inválido", this.carForm.value);
      return;
    }
  
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.error('No se encontró el userId en sessionStorage');
      return;
    }
  
    const nuevoAuto = {
      ...this.carForm.value,
      user: { id: Number(userId) }  // ¡Asegúrate de usar "user"!
    };
  
    this.autosService.addAuto(nuevoAuto).subscribe({
      next: res => {
        console.log('Auto registrado con éxito', res);
        this.carForm.reset();
        this.router.navigate(['/servicios']);
      },
      error: err => {
        console.error('Error al registrar el auto', err);
      }
    });
  }
  
}
