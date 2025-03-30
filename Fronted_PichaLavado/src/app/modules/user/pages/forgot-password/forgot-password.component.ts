import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AuthService } from '../../../../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  // Getters para acceder fácilmente a los controles del formulario
  get email(): AbstractControl {
    return this.forgotPasswordForm.get('email');
  }

  get telefono(): AbstractControl {
    return this.forgotPasswordForm.get('telefono');
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      const requestBody = {
        email: this.forgotPasswordForm.value.email,
        telefono: this.forgotPasswordForm.value.telefono
      };

      this.authService.forgotPassword(requestBody).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.successMessage = 'Revisa tu correo para restablecer la contraseña.';
          this.forgotPasswordForm.reset();
        },
        error: () => {
          this.isSubmitting = false;
          this.errorMessage = 'Hubo un error, intenta nuevamente.';
        }
      });
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
