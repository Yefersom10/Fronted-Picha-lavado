import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userName: string;
  router: any;

  ngOnInit() {
    // Recuperamos el nombre del usuario almacenado en localStorage
    this.userName = localStorage.getItem('userName');
  }

  logout() {
    localStorage.removeItem('userName'); // Eliminamos el nombre del usuario
    this.router.navigate(['/login']); // Redirigimos a la página de login
  }
}
