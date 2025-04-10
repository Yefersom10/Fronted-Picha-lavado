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

  private apiUrl = 'http://localhost:8082/auth/login';

  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  notification: { message: string; type: 'success' | 'error' } | null = null;
  isLoading = false;
  passwordVisible = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  public async handleSubmit() {
    this.login.markAllAsTouched();

    if (this.login.invalid) {
      this.showNotification('Por favor, complete todos los campos correctamente.', 'error');
      return;
    }

    this.isLoading = true;
    try {
      const loginData = {
        email: this.login.get('email')?.value?.trim(),
        password: this.login.get('password')?.value
      };

      this.httpClient.post(this.apiUrl, loginData, { observe: 'response', withCredentials: true })
        .subscribe({
          next: (res) => {
            if (res.status === 200) {
              this.httpClient.get('http://localhost:8082/auth/current', { withCredentials: true })
                .subscribe({
                  next: (userData: any) => {
                    console.log('Usuario actual desde sesión:', userData);

                    const userId = userData.id;
                    const userName = userData.name;
                    const userRole = userData.role;

                    sessionStorage.setItem('userId', userId);
                    sessionStorage.setItem('userName', userName);
                    sessionStorage.setItem('userRole', userRole);
                    this.showNotification(`¡Bienvenido, ${userName}!`, 'success');
                    this.login.reset();

                    setTimeout(() => {
                      switch (userRole) {
                        case 'CLIENTE':
                          this.router.navigate(['/pagina-principal']);
                          break;
                        case 'ADMIN':
                          this.router.navigate(['/qw/gestor-trabajadores']);
                          break;
                        default:
                          this.router.navigate(['/pagina-principal']);
                          break;
                      }
                    }, 2000);
                  },
                  error: (err) => {
                    console.error('Error al obtener usuario desde sesión:', err);
                    this.showNotification('No se pudo verificar al usuario. Intenta de nuevo.', 'error');
                  }
                });
            }
          },
          error: (error) => {
            console.error('Error en la solicitud:', error);
            if (error.status === 401) {
              this.showNotification('Credenciales incorrectas. Intente de nuevo.', 'error');
            } else {
              this.showNotification(error.error?.message || 'Error al iniciar sesión.', 'error');
            }
          }
        });

    } catch (error) {
      console.error('Error en el proceso de login:', error);
      this.showNotification('Ocurrió un error inesperado.', 'error');
    } finally {
      this.isLoading = false;
    }
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notification = { message, type };

    setTimeout(() => {
      document.querySelector('.notification')?.classList.add('hide');
      setTimeout(() => (this.notification = null), 500);
    }, 1000);
  }

  togglePasswordVisibility() {
    const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    }
  }

}
