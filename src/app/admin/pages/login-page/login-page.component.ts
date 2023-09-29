import { Component } from '@angular/core';
import { LoginService } from './login.service';

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
  valCheck: string[] = ['remember'];

  password!: string;

  constructor(public LoginService: LoginService) { }

}
