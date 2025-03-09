import { Expense } from './../../models/expense.model';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../service/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { ExpenseTableComponent } from './expense-table/expense-table.component';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseDialogComponent } from './expense-dialog/expense-dialog.component';
import { User } from '../../models/user.model';
import { ExpenseService } from '../../service/expense.service';

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
  private expenseService = inject(ExpenseService);
  private dialog = inject(MatDialog);
  private subscription = new Subscription();

  user$ = this.authService.user$;
  user: User | null = null;
  expenses = signal<any[]>([]);

  ngOnInit() {
    let actualUser = this.user$.subscribe((user) => {
      this.user = user;

      if (this.user && this.user.id) {
        let actualExpenses = this.expenseService
          .getExpensesByUserId(this.user.id!)
          .subscribe((expensesList) => {
            this.expenses.set(expensesList);
          });

        this.subscription.add(actualExpenses);
      }
    });

    this.subscription.add(actualUser);
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
        let expense = new Expense(
          null,
          res.description,
          res.amount,
          res.category,
          this.user!.id!
        );
        let newExpense = this.expenseService.addExpense(expense).subscribe({
          next: (res) => {
            console.log(res);
            let newExpenses = this.expenseService
              .getExpensesByUserId(this.user!.id!)
              .subscribe({
                next: (res) => {
                  console.log(res);
                  this.expenses.set(res);
                },
                error: (err) => {
                  console.log(err);
                },
              });
            this.subscription.add(newExpenses);
          },
          error: (err) => {
            console.log(err);
          },
        });

        this.subscription.add(newExpense);
      }
    });
  }
}
function next(value: Expense): void {
  throw new Error('Function not implemented.');
}
