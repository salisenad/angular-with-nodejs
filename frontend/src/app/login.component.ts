import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  template: `
  <mat-card>
        <mat-card-header>
            <mat-card-title>
               <h4> Login</h4>
            </mat-card-title>
         </mat-card-header>

<mat-card-content>
      
  </mat-card-content>

  </mat-card>

  `
  
})
export class LoginComponent {
    loginData = {}

    constructor(private authService: AuthService) {}
    post() {
        this.authService.loginUser(this.loginData)
    }
}
