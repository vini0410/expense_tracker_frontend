import { Component, DestroyRef, inject, signal } from '@angular/core';
import { UserLoggedComponent } from './user-logged/user-logged.component';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [UserLoggedComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private subscription = new Subscription();
  isLogged = signal<boolean | null>(null);

  ngOnInit() {
    let subs = this.authService.logged$.subscribe((logged) => {
      this.isLogged.set(logged);
    });

    this.subscription.add(subs);

    this.destroyRef.onDestroy(() => this.subscription);
  }
}
