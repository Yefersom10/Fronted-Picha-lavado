import { Component, OnInit } from '@angular/core';
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
export class GestorTrabajadoresComponent implements OnInit {
  activeTab: string = 'users';

  searchTermUser: string = '';
  usuarios: any[] = [];
  autos: any[] = [];
  searchTermServicio: string = '';
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
  ) {}

  ngOnInit(): void {
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
      console.log('Usuarios cargados:', data);
      this.usuarios = data;
    });

    this.servicioService.getAll().subscribe(data => {
      this.servicios = data;
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
    this.autosService.updateAuto(this.editingAuto.id, this.editingAuto).subscribe({
      next: res => {
        console.log('Auto actualizado con éxito', res);
      },
      error: err => {
        console.error('Error al actualizar el auto', err);
      }
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
  get filteredServicios() {
    return this.servicios.filter(s =>
      s.nombre?.toLowerCase().includes(this.searchTermServicio.toLowerCase())
    );
  }

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
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
}
