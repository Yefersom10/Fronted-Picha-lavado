import { Component, OnInit } from '@angular/core';
import { NavbarAdminComponent } from '../modules/admin/navbar-admin/navbar-admin.component';
import { CommonModule } from '@angular/common';
import { FacturaReporte } from '../models/factura-reporte.dto';
import { FacturaReporteService } from '../services/factura-reporte.service';
import { FacturaService } from '../service/factura.service';
import { PagoService } from '../service/pago.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportes',
  imports: [NavbarAdminComponent, CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  filtro = {
    nombre: '',
    servicio: '',
    placa: '',
    correo: '',
    auto: '',
    fecha: ''
  };

  facturasFiltradas:any|[] = [];


  facturas: FacturaReporte[] = [];
  ngOnInit(): void {
  this.reporteService.obtenerReporteFacturas().subscribe({
    next: (data) => {
      this.facturas = data;
      this.facturasFiltradas = data;
    },
    error: (err) => {
      console.error('Error al obtener las facturas', err);
    }
  });
}


  descargarPdf() {
    window.open('http://localhost:8082/api/v1/facturas/facturas/pdf', '_blank');
  }

  descargarExcel() {
    window.open('http://localhost:8082/api/v1/facturas/facturas/excel', '_blank');
  }
  pagos: any[] = [];

  constructor(
    private facturaService: FacturaService,
    private reporteService: FacturaReporteService
  ) { }

  filtrarFacturas() {
  const nombre = this.filtro.nombre.toLowerCase();
  const servicio = this.filtro.servicio.toLowerCase();
  const placa = this.filtro.placa.toLowerCase();
  const correo = this.filtro.correo.toLowerCase();
  const auto = this.filtro.auto.toLowerCase();
  const fecha = this.filtro.fecha.toLowerCase();

  this.facturasFiltradas = this.facturas.filter(f =>
    f.nombreUsuario?.toLowerCase().includes(nombre) &&
    f.nombreServicio?.toLowerCase().includes(servicio) &&
    f.placaAuto?.toLowerCase().includes(placa) &&
    f.emailUsuario?.toLowerCase().includes(correo) &&
    f.nombreAuto?.toLowerCase().includes(auto) &&
    (!fecha || f.fechaEmision?.toISOString().slice(0, 10).includes(fecha)) // compara si contiene la fecha ingresada
  );
}

}
