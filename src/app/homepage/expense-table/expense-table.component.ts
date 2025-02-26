import { Component, DestroyRef, inject, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ExpenseControlService } from '../../service/expense-control.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expense-table',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.scss',
})
export class ExpenseTableComponent {
  private service = inject(ExpenseControlService);
  private destroyRef = inject(DestroyRef);
  private subscription = new Subscription();
  displayedColumns: string[] = [
    'id',
    'description',
    'amount',
    'category',
    'tools',
  ];

  id = input<number>();
  expenses!: any[];

  ngOnInit() {
    console.log(this.id());
    console.log(this.expenses);

    let subs = this.service.getExpenses().subscribe((expensesList) => {
      this.expenses = expensesList;
    });

    this.subscription.add(subs);

    console.log(this.id());
    console.log(this.expenses);
    this.destroyRef.onDestroy(() => this.subscription);
  }

  onUpdate(obj: any) {
    console.log(obj);
  }

  onDelete(obj: any) {
    console.log(obj);
  }
}
