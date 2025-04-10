import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { RegisterComponent } from './modules/user/register/register.component';
import { LoginComponent } from './modules/user/login/login.component';
import { PaginaPricipalComponent } from './modules/user/pages/pagina-pricipal/pagina-pricipal.component';
import { ForgotPasswordComponent } from './modules/user/pages/forgot-password/forgot-password.component';
import { RegisterCarsComponent } from './modules/user/pages/register-cars/register-cars.component';
import { AutosComponent } from './modules/admin/autos/autos.component';
import { GestorTrabajadoresComponent } from './modules/admin/gestor-trabajadores/gestor-trabajadores.component';
<<<<<<< HEAD
import { ServiciosComponent } from './modules/user/pages/servicios/servicios.component';
=======
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
>>>>>>> bba4a061c48b4e7c7a1ff12d579db7a51f70f9f8


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'pagina-principal', component: PaginaPricipalComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'register-cars', component: RegisterCarsComponent }, 
    { path: 'autos/list', component: AutosComponent }, 
<<<<<<< HEAD
    { path: 'qw/gestor-trabajadores', component: GestorTrabajadoresComponent }, 
    { path: 'servicios', component: ServiciosComponent}, 
=======
    { path: 'qw/gestor-trabajadores', component: GestorTrabajadoresComponent },
    {path: "vehicle-list", component: VehicleListComponent} ,
>>>>>>> bba4a061c48b4e7c7a1ff12d579db7a51f70f9f8
    { path: '**', redirectTo: '' } 
];
