import { Component } from '@angular/core';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { AdminService } from '../../../service/admin.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home-admin',
  imports: [NavbarAdminComponent, CommonModule, FooterComponent],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {
 stats: any = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.loading = true;
    this.adminService.getDashboardStats().subscribe({
      next: (response) => {
        this.stats = response;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener las estadísticas', err);
        this.error = 'No se pudieron cargar las estadísticas. Intente nuevamente más tarde.';
        this.loading = false;
      }
    });
  }
}
