import { Routes } from '@angular/router';
import { HomepageComponent } from './core/homepage/homepage.component';
import { WelcomeComponent } from './core/welcome/welcome.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { AuthGuard } from './service/auth-guard.service';

export const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];
