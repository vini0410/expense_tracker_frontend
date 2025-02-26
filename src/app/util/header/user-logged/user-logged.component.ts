import { Component, inject, DestroyRef } from '@angular/core';
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
  private destroyRef = inject(DestroyRef);
  private subscription = new Subscription();
  isLogged: boolean | null = null;

  ngOnInit() {
    let subs = this.authService.logged$.subscribe((logged) => {
      this.isLogged = logged;
    });

    this.subscription.add(subs);

    this.destroyRef.onDestroy(() => this.subscription);
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['']);
  }

  navitateToLogin() {
    this.route.navigate(['login']);
  }
}
