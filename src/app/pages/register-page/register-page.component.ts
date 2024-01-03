import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ValidatorService } from '../../validators/validator.service';
import { AuthService } from 'src/app/account/services/Account.service';
import { MessageService } from 'primeng/api';
@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  providers:[MessageService]
})
export class RegisterPageComponent implements OnInit {
  constructor(private router:Router,private AuthService:AuthService,private FormBuilder:FormBuilder,private ValidatorService:ValidatorService,private MessageService:MessageService){}
  ngOnInit(): void {
    const {gender,birthdate,lastnames,email,password,names,phone}=this.AuthService._User
    this.RegisterForm=this.FormBuilder.group({
      email:[email,[Validators.required,Validators.pattern(this.ValidatorService.emailPattern)]],
      names:[names,[Validators.required,Validators.pattern(this.ValidatorService.firstNameAndLastnamePattern)]],
      lastnames:[lastnames,[Validators.required,Validators.pattern(this.ValidatorService.firstNameAndLastnamePattern)]],
      gender:[gender,[Validators.required]],
      phone:[phone,[Validators.required]],
      birthdate:[birthdate,[Validators.required]],
      password:[password,[Validators.required,Validators.minLength(10),Validators.pattern(this.ValidatorService.passPattern)]],
      Confirmpassword:[password,[Validators.required]]
    },{
      validators:[
        this.PasswordEquals('password','Confirmpassword')
      ]
    })
  }
  public RegisterForm:FormGroup=this.FormBuilder.group({})
  VerifyAccount(){
    const Registerform=this.RegisterForm.value
    const {Confirmpassword,...UserInfo}=Registerform
    this.AuthService.Register(UserInfo).subscribe({
      next: (response) => {
        if (response.status===200) {
         this.MessageService.add({life:3000,severity:'success',summary:'Cuenta creada con exito',detail:response.message})
         //se envian los datos a el backend
         setTimeout(()=>{
          this.setUserInfo()
          this.router.navigateByUrl('SimplementeFlow/NewUser/VerifyAccount');
          this.AuthService.isValidRegister = true;
         },3000)
        }
      },
      error: (err) => {
        this.MessageService.add({life:2000,severity:'error',summary:'Error al crear cuenta',detail:err.error.message})
      }
    });
  }
  setUserInfo(){
    this.AuthService.setUser(this.RegisterForm.value)
  }
  PasswordEquals(field1:string,field2:string){
    return this.ValidatorService.AreFieldsEquals(field1,field2)
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
isValidField(field:string){
  return this.ValidatorService.isValidField(this.RegisterForm,field)
}
MessageError(field:string){
return this.ValidatorService.getFieldError(this.RegisterForm,field)
}

}
