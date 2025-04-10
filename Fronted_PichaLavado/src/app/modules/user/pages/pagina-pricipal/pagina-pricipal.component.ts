<<<<<<< HEAD
import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
=======
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
>>>>>>> bba4a061c48b4e7c7a1ff12d579db7a51f70f9f8

@Component({
  selector: 'app-pagina-pricipal',
  imports: [NavbarComponent],
  templateUrl: './pagina-pricipal.component.html',
  styleUrl: './pagina-pricipal.component.css'
})
export class PaginaPricipalComponent implements OnInit {

<<<<<<< HEAD
=======
  userName: string | null = '';
  nuevoAuto: any = null; // ✅ Aquí se guarda el auto recibido
>>>>>>> bba4a061c48b4e7c7a1ff12d579db7a51f70f9f8


<<<<<<< HEAD
=======
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
>>>>>>> bba4a061c48b4e7c7a1ff12d579db7a51f70f9f8
}
