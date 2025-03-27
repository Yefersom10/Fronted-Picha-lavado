import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { RegisterComponent } from './modules/user/pages/register/register.component';
import { LoginComponent } from './modules/user/pages/login/login.component';
import { PaginaPricipalComponent } from './modules/user/pages/pagina-pricipal/pagina-pricipal.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'pagina-principal', component: PaginaPricipalComponent }, // Mueve esta línea antes del redirect
    { path: '**', redirectTo: '' } // Redirect to home
];
