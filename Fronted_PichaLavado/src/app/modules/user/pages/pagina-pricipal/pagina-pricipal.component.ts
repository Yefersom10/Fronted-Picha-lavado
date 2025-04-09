import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagina-pricipal',
  imports: [RouterLink],
  templateUrl: './pagina-pricipal.component.html',
  styleUrl: './pagina-pricipal.component.css'
})
export class PaginaPricipalComponent implements OnInit {

  userName: string | null = '';
  nuevoAuto: any = null; // ✅ Aquí se guarda el auto recibido

  constructor(private router: Router) {}

  ngOnInit() {
    // Recuperamos el nombre del usuario
    this.userName = localStorage.getItem('userName');

    // ✅ Obtenemos el estado (el auto registrado)
    const navigation = this.router.getCurrentNavigation();
    this.nuevoAuto = navigation?.extras?.state?.['nuevoAuto'];

    if (this.nuevoAuto) {
      console.log('🚗 Auto registrado recibido:', this.nuevoAuto);
    }
  }

  logout() {
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
}
