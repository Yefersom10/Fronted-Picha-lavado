import { Routes } from '@angular/router';
import { HomeComponent } from './modules/user/pages/home/home.component';
import { RegisterComponent } from './modules/user/pages/register/register.component';
import { LoginComponent } from './modules/user/pages/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
];
