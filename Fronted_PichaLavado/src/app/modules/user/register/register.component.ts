import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormControl, FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  emailExists = false;
  registerSuccess = false;
  registerError = false;
  formInvalid = false;

  register = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    ]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    ]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{9,10}$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5), // ✅ Mínimo 5 caracteres
      this.passwordValidator
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ])
  }, { validators: this.passwordMatchValidator });

  constructor(
    private httpClient: HttpClient,
    private router: Router, private cd: ChangeDetectorRef
  ) { }

  passwordValidator(control: FormControl): ValidationErrors | null {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value); // ✅ Al menos una mayúscula
    return value.length >= 5 && hasUpperCase ? null : { passwordInvalid: true };
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  resetEmailExists() {
    this.emailExists = false;
    this.cd.detectChanges();  // 🔹 Forzar detección de cambios
  }

  checkEmail() {
    const email = this.register.get('email')?.value;
    console.log("🔹 checkEmail() se ejecutó con email:", email);
  
    if (!email) {
      this.emailExists = false;
      console.log("🚨 Email vacío, reseteando emailExists:", this.emailExists);
      return;
    }
  
    this.httpClient.get<{ exists: boolean }>(`http://localhost:8082/auth/checkEmail?email=${email}`)
      .subscribe({
        next: (response) => {
          this.emailExists = response.exists;
          console.log("✅ Respuesta de la API:", response.exists);
        },
        error: (err) => {
          this.emailExists = false;
          console.error("❌ Error en la petición:", err);
        }
      });
  }
  
  handleSubmit() {
    this.register.markAllAsTouched();

    if (this.register.invalid || this.register.hasError('passwordMismatch')) {
      this.formInvalid = true;
      setTimeout(() => (this.formInvalid = false), 3000);
      return;
    }

    if (this.emailExists) {
      return;
    }

    const userData = {
      email: this.register.value.email || '',
      apellido: this.register.value.apellido || '',
      name: this.register.value.name || '',
      password: this.register.value.password || '',
      telefono: this.register.value.telefono || ''
    };

    this.isLoading = true;

    this.httpClient.post('http://localhost:8082/auth/register', userData).subscribe({
      next: () => {
        this.registerSuccess = true;
        this.registerError = false;
        this.emailExists = false;
        this.register.reset();

        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        console.error("Error en el registro:", error);
        this.registerError = true;
        this.isLoading = false;

        if (error.status === 400 && error.error?.message === 'El correo ya está registrado') {
          this.emailExists = true;
        }

        setTimeout(() => {
          this.registerError = false;
        }, 3000);
      }
    });
  }
}
