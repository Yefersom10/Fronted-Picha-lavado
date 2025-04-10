import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-pagina-pricipal',
  imports: [NavbarComponent],
  templateUrl: './pagina-pricipal.component.html',
  styleUrl: './pagina-pricipal.component.css'
})
export class PaginaPricipalComponent implements OnInit {
  constructor(private router: Router) {}

  userName: string | null = '';
  nuevoAuto: any = null; // ✅ Aquí se guarda el auto recibido


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