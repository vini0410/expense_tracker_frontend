import { debounceTime, of, Subscription } from 'rxjs';
import { Component, DestroyRef, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private service = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private subscription = new Subscription();

  form = new FormGroup({
    email: new FormControl(null, {
      validators: [Validators.required, Validators.email], // asyncValidators: [emailIsUnique],
    }),
    password: new FormControl(null, [Validators.required]), // mustContainQuestionMark
  });

  login() {
    let data = this.form.value;
    console.log(data);
    if (!this.form.invalid && data.email && data.password) {
      let user: User = {
        email: data.email,
        password: data.password,
      };
      let subs = this.service.getUserByEmail(user.email).subscribe({
        next: (resp) => {
          console.log('Usuário recebido,', resp);
          if (resp.password !== user.password) {
            console.log('Senha inválida');
            return;
          } else {
            console.log('Senha correta');
            this.authService.login(resp.id!);
            this.router.navigate(['/homepage']);
          }
        },
        error: (err) => {
          console.log('Usuário inválido', err);
        },
      });
      this.subscription.add(subs);
    }

    this.destroyRef.onDestroy(() => this.subscription);
  }

  get emailInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  get buttonDisabled() {
    if (this.form.invalid || this.emailInvalid || this.passwordInvalid) {
      return true;
    }
    return false;
  }
}

function mustContainQuestionMark(input: AbstractControl) {
  if (input.value.includes('?')) {
    return null;
  }
  return { doesNotContainQuestionMark: true };
}

function emailIsUnique(input: AbstractControl) {
  if (input.value === 'teste@teste.com') {
    return of(null);
  }
  return of({ emailIsNotUnique: true });
}
