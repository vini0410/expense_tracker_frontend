import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private service = inject(UserService);
  private userId = new BehaviorSubject<string | null>(null);
  userId$ = this.userId.asObservable();
  private logged = new BehaviorSubject<boolean>(false);
  logged$ = this.logged.asObservable();
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor() {
    // Checks if the user is already logged in when starting the service
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userId = JSON.parse(storedUser);
      this.userId.next(userId);
      this.logged.next(true);
      this.fetchUserData(userId).subscribe();
    }
  }

  login(id: string) {
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
  private fetchUserData(userId: string): Observable<User | null> {
    return this.service.getUserById(userId).pipe(
      tap((user) => {
        this.user.next(user);
      })
    );
  }
}
