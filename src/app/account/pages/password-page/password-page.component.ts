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
    //this.ValidatorService.AreFieldsEquals('NewPassword','ConfirmNewPassword'),
    //this.ValidatorService.FieldsDiferents('Password','NewPassword'),
    this.ValidatorService.passwordsMatch,
  ]
  });
ChangePassword(){

  if (!this.passForm.valid) {
    console.log(this.passForm.status)
    return
  }
  console.log("PASSWORD CHANGED")
  this.passForm.reset()
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
}
