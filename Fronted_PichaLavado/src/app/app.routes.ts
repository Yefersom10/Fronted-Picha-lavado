import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { RegisterComponent } from './modules/user/register/register.component';
import { LoginComponent } from './modules/user/login/login.component';
import { PaginaPricipalComponent } from './modules/user/pages/pagina-pricipal/pagina-pricipal.component';
import { ForgotPasswordComponent } from './modules/user/pages/forgot-password/forgot-password.component';
import { RegisterCarsComponent } from './modules/user/pages/register-cars/register-cars.component';
import { ServiciosComponent } from './modules/user/pages/servicios/servicios.component';
import { VehicleListComponent } from './modules/user/pages/vehicle-list/vehicle-list.component';
import { ReservaComponent } from './modules/user/pages/reserva/reserva.component';
import { ReservaAdminComponent } from './modules/admin/pages/reserva-admin/reserva-admin.component';
import { ServiciosAdminComponent } from './modules/admin/pages/servicios-admin/servicios-admin.component';
import { UserAdminComponent } from './modules/admin/pages/user-admin/user-admin.component';
import { HomeAdminComponent } from './modules/admin/home-admin/home-admin.component';
import { FacturaAdminComponent } from './modules/admin/pages/factura-admin/factura-admin.component';
import { FacturaComponent } from './modules/user/pages/factura/factura.component';
import { MisReservasComponent } from './modules/user/pages/mis-reservas/mis-reservas.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'pagina-principal', component: PaginaPricipalComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'register-cars', component: RegisterCarsComponent },
    { path: 'servicios', component: ServiciosComponent },
    { path: 'servicios', component: ServiciosComponent },
    { path: 'vehicle-list', component: VehicleListComponent },
    { path: 'reservas', component: ReservaComponent },
    {path: 'factura/:id', component: FacturaComponent},
    { path: 'mis-reservas', component: MisReservasComponent },
    { path: 'admin/dashboard', component: HomeAdminComponent },
    { path: 'admin/clientes', component: UserAdminComponent },
    { path: 'admin/servicios', component: ServiciosAdminComponent },
    { path: 'admin/reservas', component: ReservaAdminComponent },
    { path: 'admin/factura', component: FacturaAdminComponent },
    { path: '**', redirectTo: '' }
];
