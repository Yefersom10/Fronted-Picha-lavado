import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutosService } from '../../../service/autos.service';
import { ReservaService } from '../../../service/reserva.service';
import { ServicioService } from '../../../service/servicio.service';
import { UsersService } from '../../../service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestor-trabajadores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestor-trabajadores.component.html',
  styleUrls: ['./gestor-trabajadores.component.css'],
})
export class GestorTrabajadoresComponent {
  activeTab: string = 'users';

  searchTermUser: string = '';
  usuarios: any[] = [];
  autos: any[] = [];
  servicios: any[] = [];
  reservas: any[] = [];

  newUser: any = {};
  editingUser: any = null;

  newAuto: any = {};
  editingAuto: any = null;

  newServicio: any = {};
  editingServicio: any = null;

  newReserva: any = {};
  editingReserva: any = null;
  

  constructor(
    private usersService: UsersService,
    private autosService: AutosService,
    private servicioService: ServicioService,
    private reservaService: ReservaService,
    private router: Router,
  ) {
    this.loadAll();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // USUARIOS
  get filteredUsers() {
    return this.usuarios.filter(u =>
      u.name?.toLowerCase().includes(this.searchTermUser.toLowerCase())
    );
  }

  loadAll() {
    this.usersService.getAll().subscribe(data => {
      console.log('Usuarios cargados:', data); // 👈 para verificar en consola
      this.usuarios = data;
    });
  }

  addUser() {
    this.usersService.create(this.newUser).subscribe(user => {
      this.usuarios.push(user);
      this.newUser = {};
    });
  }

  startEditUser(user: any) {
    this.editingUser = { ...user };
  }

  saveEditUser() {
    this.usersService.update(this.editingUser).subscribe(updated => {
      const index = this.usuarios.findIndex(u => u.id === updated.id);
      this.usuarios[index] = updated;
      this.editingUser = null;
    });
  }

  cancelEditUser() {
    this.editingUser = null;
  }

  deleteUser(id: number) {
    this.usersService.delete(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(u => u.id !== id);
    });
  }

  // AUTOS
  addAuto() {
    this.autosService.addAuto(this.newAuto).subscribe(auto => {
      this.autos.push(auto);
      this.newAuto = {};
    });
  }

  startEditAuto(auto: any) {
    this.editingAuto = { ...auto };
  }

  saveEditAuto() {
    this.autosService.updateAuto(this.editingAuto).subscribe(updated => {
      const index = this.autos.findIndex(a => a.id === updated.id);
      this.autos[index] = updated;
      this.editingAuto = null;
    });
  }

  cancelEditAuto() {
    this.editingAuto = null;
  }

  deleteAuto(id: number) {
    this.autosService.deleteAuto(id).subscribe(() => {
      this.autos = this.autos.filter(a => a.id !== id);
    });
  }

  // SERVICIOS
  addServicio() {
    this.servicioService.create(this.newServicio).subscribe(serv => {
      this.servicios.push(serv);
      this.newServicio = {};
    });
  }

  startEditServicio(serv: any) {
    this.editingServicio = { ...serv };
  }

  saveEditServicio() {
    this.servicioService.update(this.editingServicio).subscribe(updated => {
      const index = this.servicios.findIndex(s => s.id === updated.id);
      this.servicios[index] = updated;
      this.editingServicio = null;
    });
  }

  cancelEditServicio() {
    this.editingServicio = null;
  }

  deleteServicio(id: number) {
    this.servicioService.delete(id).subscribe(() => {
      this.servicios = this.servicios.filter(s => s.id !== id);
    });
  }

  // RESERVAS
  addReserva() {
    this.reservaService.create(this.newReserva).subscribe(res => {
      this.reservas.push(res);
      this.newReserva = {};
    });
  }

  startEditReserva(res: any) {
    this.editingReserva = { ...res };
  }

  saveEditReserva() {
    this.reservaService.update(this.editingReserva).subscribe(updated => {
      const index = this.reservas.findIndex(r => r.id === updated.id);
      this.reservas[index] = updated;
      this.editingReserva = null;
    });
  }

  cancelEditReserva() {
    this.editingReserva = null;
  }

  deleteReserva(id: number) {
    this.reservaService.delete(id).subscribe(() => {
      this.reservas = this.reservas.filter(r => r.id !== id);
    });
  }
  

  logout() {
    localStorage.removeItem('userName'); // Eliminamos el nombre del usuario
    this.router.navigate(['/login']); // Redirigimos a la página de login
  }
}
