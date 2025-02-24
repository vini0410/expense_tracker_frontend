import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseControlService {
  constructor() { }

  private usuarios = [
    { id: 1, name: 'João', email: 'joao@email.com', password: '123456' },
    { id: 2, name: 'Maria', email: 'maria@email.com', password: '123456' },
    { id: 3, name: 'Pedro', email: 'pedro@email.com', password: '123456' }
  ];

  getUsuarios(): Observable<any[]> {
    return of(this.usuarios);
  }

  getUsuarioById(id: number): Observable<any> {
    let user = this.usuarios.find(usuario => usuario.id === id);
    if (user) {
      return of(user);
    }
    throw new Error('Usuário não encontrado'); // add tratamento de erro
  }

  getUsuarioByName(name: string): Observable<any> {
    let user = this.usuarios.find(usuario => usuario.name === name);
    if (user) {
      return of(user);
    }
    throw new Error('Usuário não encontrado'); // add tratamento de erro
  }

  getUsuarioByEmail(email: string): Observable<any> {
    let user = this.usuarios.find(usuario => usuario.email === email);
    if (user) {
      return of(user);
    }
    throw new Error('Usuário não encontrado'); // add tratamento de erro
  }

  addUsuario(usuario: any): Observable<any> {
    this.usuarios.push(usuario);
    return of(usuario);
  }

}
