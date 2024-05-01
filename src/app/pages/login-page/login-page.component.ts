import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../validators/validator.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/account/services/Account.service';
import { MessageService } from 'primeng/api';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers:[MessageService]
})
export class LoginPageComponent {
  constructor(private FB:FormBuilder,private ValidatorService:ValidatorService,private Router:Router,private AuthService:AuthService,private MessageService:MessageService){}
  public LoginForm:FormGroup=this.FB.group({
    email:["",[Validators.required,Validators.pattern(this.ValidatorService.emailPattern)]],
    password:["",Validators.required]
  })
  @ViewChild('correo') email!:ElementRef
  @ViewChild('contrasena') pass!:any
  LoginError:string="";
  login(){
    this.LoginForm.markAllAsTouched();
    if (this.LoginForm.valid) {
      const {email,password}=this.LoginForm.value
        this.AuthService.SignIn(email,password).subscribe({
          next:(response)=>{
              localStorage.setItem('Token',response.token)
              this.AuthService.setUser(response.User)
              this.MessageService.add({ severity: 'success',life:3000, summary: 'Inicio de sesion exitoso', detail: `Bienvenido ${response.User.names}`});
              setTimeout(()=>{
                this.AuthService.IsLog=true
                this.Router.navigateByUrl('/Home');
              },3000)
          },
          error:(error)=>{
            this.LoginForm.markAllAsTouched();
            this.LoginError=error.error.message
            if (error.error.message.includes('correo')) {
              this.LoginForm.get('email')?.setValue("")
              this.LoginForm.get('email')?.markAsUntouched()
            }
            else{
              this.LoginForm.get('password')?.setValue("")
              this.LoginForm.get('password')?.markAsUntouched()
            }
          }
        })
  }
}
  IsInvalidField(field:string):boolean|null{
    return this.ValidatorService.isValidField(this.LoginForm,field)
  }
  GetErrorMessage(field:string){
    return this.ValidatorService.getFieldError(this.LoginForm,field)
  }
}
