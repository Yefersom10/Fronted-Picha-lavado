import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../../service/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, RouterModule,RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isSubmitting = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  get telefono() {
    return this.forgotPasswordForm.get('telefono');
  }
  
  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
  
    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';
  
    const { email, telefono } = this.forgotPasswordForm.value;
  
    this.authService.forgotPasswordUsers(email, telefono).subscribe({
      next: (userResponse) => {
        console.log("Respuesta de UsersController:", userResponse);
        this.successMessage = "Se han enviado las instrucciones a tu correo.";
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error("Error en la solicitud:", error);
        this.errorMessage = "Ocurrió un error al procesar la solicitud.";
        this.isSubmitting = false;
      }
    });
  }
}
