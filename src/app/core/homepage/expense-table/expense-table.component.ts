import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-expense-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.scss',
})
export class ExpenseTableComponent {
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);
  private subscription = new Subscription();
  displayedColumns: string[] = [
    'id',
    'description',
    'amount',
    'category',
    'tools',
  ];

  expenses = input<any[]>();
  expenseEdited = output<any[]>();

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
        let expense = this.expenses()!.find((expense) => expense.id === res.id);
        Object.assign(expense, res);
        this.expenseEdited.emit(this.expenses()!);
      }
    });
  }

  onDelete(obj: any) {
    console.log(obj);
    this.expenseEdited.emit(
      this.expenses()!.filter((expense) => expense.id !== obj.id)
    );
  }
}
