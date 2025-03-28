import { Component, inject, DestroyRef, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-logged',
  imports: [MatButtonModule],
  templateUrl: './user-logged.component.html',
  styleUrl: './user-logged.component.scss',
})
export class UserLoggedComponent {
  private route = inject(Router);
  private authService = inject(AuthService);
  isLogged = input<boolean | null>(null);

  logout() {
    this.authService.logout();
    this.route.navigate(['']);
  }

  navitateToLogin() {
    this.route.navigate(['login']);
  }
}
