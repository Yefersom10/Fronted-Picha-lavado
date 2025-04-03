import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagina-pricipal',
  imports: [RouterLink],
  templateUrl: './pagina-pricipal.component.html',
  styleUrl: './pagina-pricipal.component.css'
})
export class PaginaPricipalComponent {

  userName: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Recuperamos el nombre del usuario almacenado en localStorage
    this.userName = localStorage.getItem('userName');
  }

  logout() {
    localStorage.removeItem('userName'); // Eliminamos el nombre del usuario
    this.router.navigate(['/login']); // Redirigimos a la página de login
  }
}
