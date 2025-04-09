import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { RegisterComponent } from './modules/user/register/register.component';
import { LoginComponent } from './modules/user/login/login.component';
import { PaginaPricipalComponent } from './modules/user/pages/pagina-pricipal/pagina-pricipal.component';
import { ForgotPasswordComponent } from './modules/user/pages/forgot-password/forgot-password.component';
import { RegisterCarsComponent } from './modules/user/pages/register-cars/register-cars.component';
import { AutosComponent } from './modules/admin/autos/autos.component';
import { GestorTrabajadoresComponent } from './modules/admin/gestor-trabajadores/gestor-trabajadores.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'pagina-principal', component: PaginaPricipalComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'register-cars', component: RegisterCarsComponent }, 
    { path: 'autos/list', component: AutosComponent }, 
    { path: 'qw/gestor-trabajadores', component: GestorTrabajadoresComponent },
    {path: "vehicle-list", component: VehicleListComponent} ,
    { path: '**', redirectTo: '' } 
];
