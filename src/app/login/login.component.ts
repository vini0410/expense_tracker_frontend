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
import { ExpenseControlService } from '../service/expense-control.service';

import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

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
  private service = inject(ExpenseControlService);
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
    let subs = this.service.getUserByEmail(data.email!).subscribe({
      next: (resp) => {
        console.log('Usuário válido,', resp);
        this.authService.login(resp.id);
        this.router.navigate(['/homepage']);
      },
      error: (err) => {
        console.log('Usuário inválido', err);
      },
    });

    this.subscription.add(subs)

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

  ngOnInit() {
    // const savedForm = window.localStorage.getItem('loginForm');
    // if (savedForm) {
    //   const formValue = JSON.parse(savedForm);
    //   this.form.patchValue({
    //     email: formValue.email,
    //   });
    // }
    // const subscription = this.form.valueChanges
    //   .pipe(debounceTime(1000))
    //   .subscribe({
    //     next: (value) => {
    //       window.localStorage.setItem('loginForm', JSON.stringify(value));
    //     },
    //   });
    // this.destroyRef.onDestroy(() => subscription);
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
