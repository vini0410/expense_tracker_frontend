import { Component, inject, DestroyRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private service = inject(UserService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private subscription = new Subscription();

  form = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    email: new FormControl(null, {
      validators: [Validators.required, Validators.email], // asyncValidators: [emailIsUnique],
    }),

    password: new FormControl(null, [Validators.required]), // mustContainQuestionMark
  });

  register() {
    let data = this.form.value;
    console.log(data);
    if (!this.form.invalid && data.name && data.email && data.password) {
      let user: Partial<User> = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      let subs = this.service.addUser(user).subscribe({
        next: (resp) => {
          console.log('Usuário cadastrado,', resp);
          this.router.navigate(['login']);
        },
        error: (err) => {
          console.log('Usuário inválido', err);
        },
      });

      this.subscription.add(subs);
    }
    this.destroyRef.onDestroy(() => this.subscription);
  }

  get nameInvalid() {
    return (
      this.form.controls.name.touched &&
      this.form.controls.name.dirty &&
      this.form.controls.name.invalid
    );
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
    if (
      this.form.invalid ||
      this.nameInvalid ||
      this.emailInvalid ||
      this.passwordInvalid
    ) {
      return true;
    }
    return false;
  }
}
