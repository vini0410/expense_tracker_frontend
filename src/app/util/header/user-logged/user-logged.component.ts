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
  isLogged: boolean | null = null;
  private subs = new Subscription();

  ngOnInit() {
    let logged = this.authService.logged$.subscribe((logged) => {
      this.isLogged = logged;
    });

    this.subs.add(logged)

    this.destroyRef.onDestroy(() => logged);
    this.destroyRef.onDestroy(() => this.subs);
  }

  navitateToLogin() {
    this.route.navigate(['login']);
  }
}
