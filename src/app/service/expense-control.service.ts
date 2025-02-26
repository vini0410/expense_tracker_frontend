import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseControlService {
  constructor() {}

  private users = [
    { id: 1, name: 'João', email: 'joao@email.com', password: '123456' },
    { id: 2, name: 'Maria', email: 'maria@email.com', password: '123456' },
    { id: 3, name: 'Pedro', email: 'pedro@email.com', password: '123456' },
    { id: 4, name: 'Vinicius', email: 'teste@teste', password: 'teste' },
  ];

  private expenses = [
    {
      id: 1,
      description: 'Uber',
      amount: 45,
      category: 'transport',
    },
    {
      id: 2,
      description: 'Mc Donalds',
      amount: 15,
      category: 'food',
    },
  ];

  addUser(user: any): Observable<any> {
    let newId = this.users.length + 1;
    user.id = newId;
    this.users.push(user);
    return of(user);
  }

  getUsers(): Observable<any[]> {
    return of(this.users);
  }

  getUserById(id: number): Observable<any> {
    let user = this.users.find((user) => user.id === id);
    if (user) {
      return of(user);
    }
    throw new Error('Usuário não encontrado'); // add tratamento de erro
  }

  getUserByName(name: string): Observable<any> {
    let user = this.users.find((user) => user.name === name);
    if (user) {
      return of(user);
    }
    throw new Error('Usuário não encontrado'); // add tratamento de erro
  }

  getUserByEmail(email: string): Observable<any> {
    let user = this.users.find((user) => user.email === email);
    if (user) {
      return of(user);
    }
    throw new Error('Usuário não encontrado'); // add tratamento de erro
  }

  addExpense(expense: any): Observable<any> {
    let newId = this.expenses.length + 1;
    expense.id = newId;
    this.expenses.push(expense);
    return of(expense);
  }

  getExpenses(): Observable<any[]> {
    return of(this.expenses);
  }

  getExpenseById(id: number): Observable<any> {
    let expense = this.expenses.find((expense) => expense.id === id);
    if (expense) {
      return of(expense);
    }
    throw new Error('Expense not found');
  }

  getExpensesBycategory(category: string): Observable<any[]> {
    let expenses = this.expenses.filter(
      (expense) => expense.category === category,
    );
    if (expenses.length > 0) {
      return of(expenses);
    }
    return of([]);
  }
}
