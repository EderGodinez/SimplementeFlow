import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ValidatorService } from 'src/app/validators/validator.service';
import { AuthService } from 'src/app/account/services/Account.service';

@Component({
  templateUrl: './login-page.component.html',
  styles: [`
  :host ::ng-deep .pi-eye,
  :host ::ng-deep .pi-eye-slash {
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
  }
`],
providers:[MessageService]
})
export class LoginPageComponent {
  constructor(
    private Router:Router,private fb:FormBuilder,private ValidatorService:ValidatorService,private LoginService:AuthService,private MessageService:MessageService) { }
    public adminlogin:FormGroup=this.fb.group({
      email:["",[Validators.required,Validators.pattern(this.ValidatorService.emailPattern)]],
      password:["",[Validators.required,Validators.minLength(10)]]
    })
    password!: string;
    email !:string;
    login(){
      this.adminlogin.markAllAsTouched();
      if (this.adminlogin.valid) {
        const {email,password}=this.adminlogin.value
        this.LoginService.SignIn(email,password).subscribe({
          next:(response)=>{
            if (response.User.UserRole==='Admin') {
              localStorage.setItem('Token',response.token)
              this.Router.navigateByUrl('Admin/dashboard');
              return
            }
            this.MessageService.add({ severity: 'error', summary: 'Error al iniciar sesion', detail: `El usuario no cuenta con rol de administrador`});
          },
          error:(error)=>{
            this.MessageService.add({ severity: 'error', summary: 'Error al iniciar sesion', detail: error.error.message });
          }
        })
      }

    }
    isValidField(field:string){
return this.ValidatorService.isValidField(this.adminlogin,field)
    }
    MessageError(field:string){
      return this.ValidatorService.getFieldError(this.adminlogin,field)
    }
}
