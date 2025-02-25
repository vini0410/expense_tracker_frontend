import { AuthService } from './auth.service';
import { Injectable, inject } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    if (this.authService.getLogged()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
