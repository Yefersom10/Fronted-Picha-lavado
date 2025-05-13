import { Component, OnInit } from '@angular/core';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { ServicioService } from '../../../service/servicio.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-servicios-admin',
  imports: [NavbarAdminComponent, CommonModule, FormsModule],
  templateUrl: './servicios-admin.component.html',
  styleUrl: './servicios-admin.component.css'
})
export class ServiciosAdminComponent implements OnInit {
  servicios: any[] = [];
  newServicio: any = {};
  searchTermServicio: string = '';
  editingServicio: any;

  constructor(
      private servicioService: ServicioService,
      private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.servicioService.getAll().subscribe(data => {
      this.servicios = data;
    });
  }

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
  
}
