import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseControlService {
  constructor() { }

  private usuarios = [
    { id: 1, nome: 'João', email: 'joao@email.com', senha: '123456' },
    { id: 2, nome: 'Maria', email: 'maria@email.com', senha: '123456' },
    { id: 3, nome: 'Pedro', email: 'pedro@email.com', senha: '123456' }
  ];

  getUsuarios(): Observable<any[]> {
    return of(this.usuarios);
  }

  getUsuario(id: number): Observable<any> {
    // return of(this.usuarios.find(usuario => usuario.id === id));
    let user = this.usuarios.find(usuario => usuario.id === id);
    if (user) {
      return of(user);
    }
    return of(null); // add tratamento de erro
  }

  addUsuario(usuario: any): Observable<any> {
    this.usuarios.push(usuario);
    return of(usuario);
  }

}
