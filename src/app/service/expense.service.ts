import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/expense-tracker';

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.apiUrl}/expenses`, expense);
  }

  updateExpense(id: string, expense: Expense): Observable<Expense> {
    return this.http.patch<Expense>(`${this.apiUrl}/expenses/${id}`, expense);
  }

  deleteExpense(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/expenses/${id}`);
  }

  getExpenseById(id: string): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/expenses/${id}`);
  }

  getExpensesBycategory(category: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/expenses/category`, {
      params: { category: category },
    });
  }

  getExpensesByUserId(user: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/expenses/user`, {
      params: { user: user },
    });
  }


  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/expenses`);
  }
}
