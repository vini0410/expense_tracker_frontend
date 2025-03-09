import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ExpenseService } from '../../../service/expense.service';
import { Expense } from '../../../models/expense.model';

@Component({
  selector: 'app-expense-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.scss',
})
export class ExpenseTableComponent {
  private destroyRef = inject(DestroyRef);
  private expenseService = inject(ExpenseService);
  private dialog = inject(MatDialog);
  private subscription = new Subscription();
  displayedColumns: string[] = ['description', 'amount', 'category', 'tools'];

  expenses = input<any[]>();
  expenseEdited = output<any[]>();

  ngOnInit() {
    this.subscription.add(this.expenses);

    this.destroyRef.onDestroy(() => this.subscription);
  }

  onUpdate(obj: any) {
    console.log(obj);
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '500px',
      height: '500px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      if (res) {
        console.log('result OK', res);
        let expense = new Expense(
          obj.id,
          res.description,
          res.amount,
          res.category,
          obj.userId
        );
        let updateExpense = this.expenseService
          .updateExpense(obj.id, expense)
          .subscribe({
            next: (res) => {
              console.log(res);
              let newExpenses = this.expenseService
                .getExpensesByUserId(obj.userId)
                .subscribe({
                  next: (res) => {
                    console.log(res);
                    this.expenseEdited.emit(res);
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
        this.subscription.add(updateExpense);
      }
    });
  }

  onDelete(obj: any) {
    console.log(obj);
    let deleteExpense = this.expenseService.deleteExpense(obj.id).subscribe({
      next: (res) => {
        console.log(res);
        let newExpenses = this.expenseService
          .getExpensesByUserId(obj.userId)
          .subscribe({
            next: (res) => {
              console.log(res);
              this.expenseEdited.emit(res);
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
    this.subscription.add(deleteExpense);
  }
}
