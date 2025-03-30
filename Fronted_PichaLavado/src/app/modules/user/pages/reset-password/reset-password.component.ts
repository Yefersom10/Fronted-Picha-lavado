import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  showPassword = false; // Para alternar la visibilidad de la contraseña
  showConfirmPassword = false;

  resetPasswordForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  email = '';
  token = '';
  passwordStrength: string = '';
  passwordStrengthText: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[A-Z]).*$')]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.getEmailByToken(this.token);
    });
  }

  // Método para obtener el email del usuario según el token
  getEmailByToken(token: string) {
    this.authService.getEmailByToken(token).subscribe({
      next: (response) => {
        this.email = response.email;
      },
      error: () => {
        this.errorMessage = 'Token inválido o expirado.';
      }
    });
  }

  // Validador para comprobar que las contraseñas coincidan
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Función para calcular la fuerza de la contraseña y devolver el porcentaje
  getPasswordStrengthPercentage(): number {
    const password = this.password.value;

    let strength = 0;
    if (password.length >= 8) strength += 20; // Al menos 8 caracteres
    if (/[A-Z]/.test(password)) strength += 20; // Al menos una mayúscula
    if (/[a-z]/.test(password)) strength += 20; // Al menos una minúscula
    if (/\d/.test(password)) strength += 20; // Al menos un número
    if (/[^A-Za-z0-9]/.test(password)) strength += 20; // Al menos un carácter especial

    if (strength <= 40) {
      this.passwordStrength = 'weak';
      this.passwordStrengthText = 'Débil';
    } else if (strength <= 80) {
      this.passwordStrength = 'medium';
      this.passwordStrengthText = 'Moderada';
    } else {
      this.passwordStrength = 'strong';
      this.passwordStrengthText = 'Fuerte';
    }

    return strength;
  }

  // Verifica si la contraseña tiene al menos una mayúscula
  hasUpperCase(value: string): boolean {
    return /[A-Z]/.test(value);
  }

  // Getters para los controles del formulario
  get password(): AbstractControl {
    return this.resetPasswordForm.get('password')!;
  }

  get confirmPassword(): AbstractControl {
    return this.resetPasswordForm.get('confirmPassword')!;
  }

  // Método que se llama cuando se envía el formulario
  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      const newPassword = this.resetPasswordForm.value.password;

      this.authService.resetPassword(this.token, newPassword).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.successMessage = 'Tu contraseña ha sido cambiada exitosamente.';
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: () => {
          this.isSubmitting = false;
          this.errorMessage = 'Hubo un error, intenta nuevamente.';
        }
      });
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }
}
