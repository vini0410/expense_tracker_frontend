import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../service/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { ExpenseTableComponent } from './expense-table/expense-table.component';

@Component({
  selector: 'app-homepage',
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    ExpenseTableComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private subscription = new Subscription();
  user$ = this.authService.user$;
  user: { id: number; name: string; email: string; password: string } | null =
    null;

  ngOnInit() {
    let subs = this.user$.subscribe((user) => {
      this.user = user;
    });

    this.subscription.add(subs);

    this.destroyRef.onDestroy(() => this.subscription);
  }
}
