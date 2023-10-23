import { Component } from '@angular/core';
import { ValidatorService } from '../../../validators/validator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './password-page.component.html',
  styleUrls: ['./password-page.component.scss']
})
export class PasswordPageComponent {
constructor(private ValidatorService:ValidatorService,private FormBuilder:FormBuilder){}
public passForm:FormGroup=this.FormBuilder.group({
  Password:["",Validators.required],
  NewPassword:["",[Validators.required,Validators.minLength(10),Validators.pattern(this.ValidatorService.passPattern)]],
  ConfirmNewPassword:["",[Validators.required,]]
},{
  validators:[
    this.ValidatorService.AreFieldsEquals('NewPassword','ConfirmNewPassword'),
    this.ValidatorService.FieldsDiferents('Password','NewPassword')
  ]
  });
ChangePassword(){

  if (!this.passForm.valid) {
    console.log(this.passForm.status)
    return
  }
  this.passForm.reset()
}
HasUpper(cadena:string) {
  for (var i = 0; i < cadena.length; i++) {
    if (cadena[i] >= 'A' && cadena[i] <= 'Z') {
      return true;
    }
  }
  return false;
}
HasNumber(cadena:string) {
const numbers:string[]=["1","2","3","4","5","6","7","8","9","0"]
for (const number of numbers) {
  if(cadena.includes(number)){
    return true
  }
}
return false
}
HasLower(cadena:string) {
  for (var i = 0; i < cadena.length; i++) {
    if (cadena[i] >= 'a' && cadena[i] <= 'z') {
      return true;
    }
  }
  return false;
}
}
