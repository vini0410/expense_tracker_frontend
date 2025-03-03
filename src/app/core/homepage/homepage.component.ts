import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../service/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { ExpenseTableComponent } from './expense-table/expense-table.component';
import { ExpenseControlService } from '../../service/expense-control.service';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseDialogComponent } from './expense-dialog/expense-dialog.component';

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
  private service = inject(ExpenseControlService);
  private dialog = inject(MatDialog);
  private subscription = new Subscription();

  user$ = this.authService.user$;
  user: { id: number; name: string; email: string; password: string } | null =
    null;
  expenses = signal<any[]>([]);
  // newExpense = signal({});

  ngOnInit() {
    let actualUser = this.user$.subscribe((user) => {
      this.user = user;
    });

    let actualExpenses = this.service
      .getExpenses()
      .subscribe((expensesList) => {
        this.expenses.set(expensesList);
      });

    this.subscription.add(actualUser);
    this.subscription.add(actualExpenses);

    this.destroyRef.onDestroy(() => this.subscription);
  }

  onEditExpenses(data: any) {
    this.expenses.set(data);
    console.log('updated data:', data);
  }

  onAdd() {
    console.log('OnAdd');
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '500px',
      height: '500px',
      // data: this.expenses,
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      if (res) {
        console.log('result OK', res);
        res.id = this.expenses().length + 1;
        this.expenses.update((expenses) => [...expenses, res]);
      }
    });
  }
}
