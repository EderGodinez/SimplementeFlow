import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {RegisterPageService} from '../register-page/register-page.service'
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ValidatorService } from '../../validators/validator.service';
interface genders{
  gender:string
}
@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  constructor(private router:Router,private RegisterPageService: RegisterPageService,private FormBuilder:FormBuilder,private ValidatorService:ValidatorService){}
  public RegisterForm:FormGroup=this.FormBuilder.group({
    email:["eder.godinez26@gmail.com",[Validators.required,Validators.pattern(this.ValidatorService.emailPattern)]],
    username:["Eder Yair",[Validators.required,Validators.pattern(this.ValidatorService.firstNameAndLastnamePattern)]],
    lastname:["Godinez Salazar",[Validators.required,Validators.pattern(this.ValidatorService.firstNameAndLastnamePattern)]],
    gender:["",[Validators.required]],
    phone:["",[Validators.required,Validators.minLength(10)]],
    birtdate:[new Date("11/01/2000"),[Validators.required]],
    password:["123456789",[Validators.required,Validators.minLength(10),Validators.pattern(this.ValidatorService.passPattern)]],
    Confirmpassword:["123456789"]
  })
  Genders:genders[]=[
  {
    gender:"Hombre",
  },
  {
    gender:"Mujer"
  },
  {
    gender:"Otro"
  }]
  VerifyAccount(){
    if (this.RegisterForm.valid) {
      //se envian los datos a el backend
      this.router.navigateByUrl('SimplementeFlow/NewUser/VerifyAccount')
    }
    return
  }
  HasUpper(campo:string) {
   return this.ValidatorService.HasUpper(campo);
  }
  HasNumber(campo:string) {
    return this.ValidatorService.HasNumber(campo);
  }
  HasLower(campo:string) {
    return this.ValidatorService.HasLower(campo);
  }
  esMayorDeEdad(fechaNacimiento:Date):boolean {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

    // Verificar si el día y el mes de nacimiento ya han ocurrido este año
    if (
      hoy.getMonth() < fechaNacimiento.getMonth() ||
      (hoy.getMonth() === fechaNacimiento.getMonth() &&
        hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--;
    }
    return edad >= 18;
}

}
