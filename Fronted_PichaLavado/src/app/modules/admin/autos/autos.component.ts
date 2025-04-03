import { Component } from '@angular/core';
import { AutosService } from '../../../service/autos.service';

@Component({
  selector: 'app-autos',
  imports: [],
  templateUrl: './autos.component.html',
  styleUrl: './autos.component.css'
})
export class AutosComponent {

  autos: any[] = [];

  constructor(private autosService: AutosService) {}

  ngOnInit(): void {
    this.cargarAutos();
  }

  cargarAutos(): void {
    this.autosService.getAutos().subscribe({
      next: (data) => (this.autos = data),
      error: (err) => console.error('Error cargando autos', err)
    });
  }

  eliminarAuto(id: number): void {
    this.autosService.deleteAuto(id).subscribe({
      next: () => this.cargarAutos(),
      error: (err) => console.error('Error eliminando auto', err)
    });
  }

}
