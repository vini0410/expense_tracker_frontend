import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../service/auth.service';
import { ExpenseControlService } from '../service/expense-control.service';

@Component({
  selector: 'app-homepage',
  imports: [MatCardModule, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  user$ = this.authService.user$;
  user: {id:number, name: string, email: string, password: string} | null = null;

  ngOnInit() {
    let subs = this.user$.subscribe((user) => {
      this.user = user;
    });

    this.destroyRef.onDestroy(() => subs);
  }
}
