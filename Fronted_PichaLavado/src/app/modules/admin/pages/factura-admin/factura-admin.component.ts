import { Component, OnInit } from '@angular/core';
import { NavbarAdminComponent } from '../../navbar-admin/navbar-admin.component';
import { FacturaService } from '../../../../service/factura.service';
import { PagoService } from '../../../../service/pago.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-factura-admin',
  imports: [NavbarAdminComponent, CommonModule],
  templateUrl: './factura-admin.component.html',
   styleUrls: ['./factura-admin.component.css']
})

export class FacturaAdminComponent implements OnInit {
  facturas: any[] = [];
  pagos: any[] = [];

  constructor(
    private facturaService: FacturaService,
    private pagoService: PagoService
  ) { }

  ngOnInit(): void {
    this.cargarFacturas();
    this.cargarPagos();
  }

  cargarFacturas() {
    this.facturaService.getFacturas().subscribe({
      next: data => this.facturas = data,
      error: err => console.error('Error cargando facturas', err)
    });
  }

  cargarPagos() {
    this.pagoService.getPagos().subscribe({
      next: data => this.pagos = data,
      error: err => console.error('Error cargando pagos', err)
    });
  }

  eliminarFactura(id: number) {
    if (confirm('¿Seguro quieres eliminar esta factura?')) {
      this.facturaService.eliminarFactura(id).subscribe({
        next: () => this.cargarFacturas(),
        error: err => console.error('Error eliminando factura', err)
      });
    }
  }

  eliminarPago(id: number) {
    if (confirm('¿Seguro quieres eliminar este pago?')) {
      this.pagoService.eliminarPago(id).subscribe({
        next: () => this.cargarPagos(),
        error: err => console.error('Error eliminando pago', err)
      });
    }
  }
  descargarPdf() {
  window.open('http://localhost:8082/api/v1/facturas/facturas/pdf', '_blank');
}

descargarExcel() {
  window.open('http://localhost:8082/api/v1/facturas/facturas/excel', '_blank');
}

}
