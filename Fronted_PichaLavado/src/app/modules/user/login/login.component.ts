import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private apiUrl = 'http://localhost:8082/loginUser';

  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // Cambio: Se usa id en lugar de email
    password: new FormControl('', Validators.required)
  });

  loginSuccess = false;
  loginError = false;
  formInvalid = false;
  errorMessage = '';
  welcomeMessage = ''; // Para mostrar el nombre del usuario

  notification: { message: string; type: 'success' | 'error' } | null = null;
  isLoading = false; // Estado para gestionar el loader

  constructor(private httpClient: HttpClient, private router: Router) {}

  public async handleSubmit() {
    this.login.markAllAsTouched();
  
    if (this.login.invalid) {
      this.showNotification('Por favor, complete todos los campos correctamente.', 'error');
      return;
    }
  
    this.isLoading = true; // Mostrar loader mientras se procesa la solicitud
  
    try {
      const response: any = await this.httpClient.post(this.apiUrl, this.login.value, { withCredentials: true }).toPromise();
      console.log(response);
  
      localStorage.setItem('userName', response.name);
      this.showNotification(`¡Bienvenido, ${response.name}!`, 'success');
  
      this.login.reset();
  
      setTimeout(() => {
        this.router.navigate(['/pagina-principal']);
      }, 2000);
      
    } catch (error: any) {
      console.error(error);
      if (error.status === 401) {
        this.showNotification('Credenciales incorrectas. Intente de nuevo.', 'error');
      } else {
        this.showNotification(error.error?.message || 'Error al iniciar sesión.', 'error');
      }
    } finally {
      // Asegurarse de ocultar el loader después de la respuesta del servidor
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    }
  }
  
  // Método para mostrar notificaciones con animación
  showNotification(message: string, type: 'success' | 'error') {
    this.notification = { message, type };
  
    setTimeout(() => {
      document.querySelector('.notification')?.classList.add('hide');
      setTimeout(() => (this.notification = null), 500);
    }, 1000);
  }
  
  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    }
  }
  passwordVisible = false;
}
