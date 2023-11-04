import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private Router:Router,private fb:FormBuilder) { }
    public adminlogin:FormGroup=this.fb.group({
      username:["",[Validators.required]],
      password:["",[Validators.required]]
    })

    password!: string;
    email !:string;
    login(){
      console.log("inicio de sesion")
      //metodo de login del servicio
      this.Router.navigateByUrl('Admin/dashboard');
    }
}
