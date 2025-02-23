import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-logged',
  imports: [MatButtonModule],
  templateUrl: './user-logged.component.html',
  styleUrl: './user-logged.component.scss'
})
export class UserLoggedComponent {
    constructor(private route:Router) { }
  
    navitateToLogin() {
      this.route.navigate(['login']);
    }

}
