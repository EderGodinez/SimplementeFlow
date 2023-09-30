import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
@Component({
  templateUrl: './login-page.component.html',
  styles: [`
  :host ::ng-deep .pi-eye,
  :host ::ng-deep .pi-eye-slash {
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
  }
`]
})
export class LoginPageComponent {
  constructor(private LoginService: LoginService,
    private Router:Router) { }


    password!: string;
    email !:string;
    login(){
      this.Router.navigateByUrl('Admin/dashboard');
    }
}
