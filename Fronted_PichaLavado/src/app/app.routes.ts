import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { RegisterComponent } from './modules/user/register/register.component';
import { LoginComponent } from './modules/user/login/login.component';
import { PaginaPricipalComponent } from './modules/user/pages/pagina-pricipal/pagina-pricipal.component';
import { ForgotPasswordComponent } from './modules/user/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './modules/user/pages/reset-password/reset-password.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'pagina-principal', component: PaginaPricipalComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    {path: 'reset-password', component: ResetPasswordComponent}, // Assuming you want to use the same component for reset password
    { path: '**', redirectTo: '' } // Redirect to home
];
