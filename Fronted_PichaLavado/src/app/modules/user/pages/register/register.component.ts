import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { 
  FormControl, 
  FormGroup, 
  FormsModule, 
  ReactiveFormsModule, 
  Validators, 
  AbstractControl 
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    HttpClientModule, 
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Password visibility flags
  showPassword = false;
  showConfirmPassword = false;

  // Loading state
  isLoading = false;

  // Form group for registration
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
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{9,10}$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      this.passwordValidator
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ])
  }, { validators: this.passwordMatchValidator });

  // State flags
  registerSuccess = false;
  registerError = false;
  formInvalid = false;

  constructor(
    private httpClient: HttpClient, 
    private router: Router
  ) {}

  // Password complexity validator
  passwordValidator(control: FormControl): { [key: string]: any } | null {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    
    return passwordValid ? null : { 'passwordInvalid': true };
  }

  // Password match validator
  passwordMatchValidator(group: AbstractControl): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Toggle confirm password visibility
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Handle form submission
  handleSubmit() {
    // Mark all fields as touched to show validation errors
    this.register.markAllAsTouched();

    // Check form validity
    if (this.register.invalid) {
      this.formInvalid = true;
      setTimeout(() => (this.formInvalid = false), 3000);
      return;
    }

    // Check password match
    if (this.register.hasError('passwordMismatch')) {
      return;
    }

    // Prepare user data
    const userData = {
      email: this.register.value.email || '',
      apellido: this.register.value.surname || '',
      name: this.register.value.name || '',
      password: this.register.value.password || '',
      telefono: this.register.value.phone || ''
    };

    // Set loading state
    this.isLoading = true;

    // Send registration request
    this.httpClient.post('http://localhost:8082/addUser', userData).subscribe(
      (response: any) => {
        console.log("Registro exitoso:", response);
        this.registerSuccess = true;
        this.registerError = false;
        this.formInvalid = false;
        this.register.reset();
        
        // Simulate loading and navigation
        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        console.error("Error en el registro:", error);
        this.registerError = true;
        this.registerSuccess = false;
        this.isLoading = false;
        
        setTimeout(() => {
          this.registerError = false;
        }, 3000);
      }
    );
  }
}