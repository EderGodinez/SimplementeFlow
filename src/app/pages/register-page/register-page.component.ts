import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ValidatorService } from '../../validators/validator.service';
import { AuthService } from 'src/app/account/services/Account.service';
import { MessageService } from 'primeng/api';
interface genders{
  gender:string
}
@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  providers:[MessageService]
})
export class RegisterPageComponent implements OnInit {
  constructor(private router:Router,private AuthService:AuthService,private FormBuilder:FormBuilder,private ValidatorService:ValidatorService,private MessageService:MessageService){}
  ngOnInit(): void {
    this.RegisterForm=this.FormBuilder.group({
      email:["eder.godinez26@gmail.com",[Validators.required,Validators.pattern(this.ValidatorService.emailPattern)]],
      names:["Eder",[Validators.required,Validators.pattern(this.ValidatorService.firstNameAndLastnamePattern)]],
      lastnames:["Godinez",[Validators.required,Validators.pattern(this.ValidatorService.firstNameAndLastnamePattern)]],
      gender:["Hombre",[Validators.required]],
      phone:["3921006281",[Validators.required]],
      birthdate:[new Date("11/01/2000"),[Validators.required]],
      password:["A123456789a",[Validators.required,Validators.minLength(10),Validators.pattern(this.ValidatorService.passPattern)]],
      Confirmpassword:["A123456789a",[Validators.required]]
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
    console.log(UserInfo)
    this.AuthService.Register(UserInfo).subscribe({
      next: (response) => {
        console.log(response)
        if (response.status===200) {
         this.MessageService.add({life:3000,severity:'success',summary:'Cuenta creada con exito',detail:response.message})
         //se envian los datos a el backend
         setTimeout(()=>{
          this.AuthService.User.email = this.RegisterForm.get('email')?.value;
          this.router.navigateByUrl('SimplementeFlow/NewUser/VerifyAccount');
          this.AuthService.isValidRegister = true;
         },3000)
        }
      },
      error: (err) => {
        console.log(err)
        this.MessageService.add({life:2000,severity:'error',summary:'Error al crear cuenta',detail:err.error.message})
      }
    });

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
