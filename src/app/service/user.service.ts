import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/expense-tracker';

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: string): void {
    this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/email`, {
      params: { email: email },
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}
