import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ExpenseControlService } from './expense-control.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private service = inject(ExpenseControlService);
  private userId = new BehaviorSubject<number | null>(null);
  userId$ = this.userId.asObservable();
  private logged = new BehaviorSubject<boolean>(false);
  logged$ = this.logged.asObservable();
  private user = new BehaviorSubject<{
    id: number;
    name: string;
    email: string;
    password: string;
  } | null>(null);
  user$ = this.user.asObservable();

  constructor() {
    // Verifica se o usuário já está logado ao iniciar o serviço
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userId = JSON.parse(storedUser);
      this.userId.next(userId);
      this.logged.next(true);
      this.fetchUserData(userId).subscribe();
    }
  }

  login(id: number) {
    this.userId.next(id);
    this.logged.next(true);
    this.fetchUserData(id).subscribe();
    localStorage.setItem('user', JSON.stringify(id));
  }

  logout() {
    this.userId.next(null);
    this.logged.next(false);
    this.user.next(null);
    localStorage.removeItem('user');
  }

  getLogged(): boolean {
    return this.logged.getValue();
  }

  // Novo método para buscar dados do usuário
  private fetchUserData(
    userId: number,
  ): Observable<{
    id: number;
    name: string;
    email: string;
    password: string;
  } | null> {
    return this.service.getUserById(userId).pipe(
      tap((user) => {
        this.user.next(user);
      }),
    );
  }
}
