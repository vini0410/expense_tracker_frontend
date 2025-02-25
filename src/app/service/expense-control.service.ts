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
    { id: 4, name: 'Teste', email: 'teste@teste', password: 'teste' },
  ];

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

  addUser(user: any): Observable<any> {
    let newId = this.users.length + 1;
    user.id = newId;
    this.users.push(user);
    return of(user);
  }
}
