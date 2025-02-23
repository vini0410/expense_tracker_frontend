import { Component } from '@angular/core';
import { UserLoggedComponent } from '../user-logged/user-logged.component';

@Component({
  selector: 'app-header',
  imports: [UserLoggedComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
