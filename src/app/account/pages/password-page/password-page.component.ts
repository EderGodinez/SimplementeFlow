import { Component } from '@angular/core';
import { ValidatorService } from '../../../validators/validator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/Account.service';
import { catchError, of, tap } from 'rxjs';
import { Message, MessageService } from 'primeng/api';

@Component({
  templateUrl: './password-page.component.html',
  styleUrls: ['./password-page.component.scss'],
  providers:[MessageService]
})
export class PasswordPageComponent {
constructor(private ValidatorService:ValidatorService,private FormBuilder:FormBuilder,private AuthService:AuthService,private Message:MessageService){}
public passForm:FormGroup=this.FormBuilder.group({
  Password:["",Validators.required],
  NewPassword:["",[Validators.required,Validators.minLength(10),Validators.pattern(this.ValidatorService.passPattern)]],
  ConfirmNewPassword:["",[Validators.required,]]
},{
  validators:[
    this.ValidatorService.AreFieldsEquals('NewPassword','ConfirmNewPassword'),
  ]
  });
  MessageError:Message[]=[]
ChangePassword(){
  this.passForm.markAllAsTouched()
  if (this.passForm.valid) {
    const {Password,NewPassword}=this.passForm.value
    this.AuthService.ChangePass(Password,NewPassword).pipe(
      tap((response)=>{
        this.AuthService.setUser(response)
        this.Message.add({life:4000,summary:'Modificacion exitosa',severity:'success',detail:'Contraseña modificada con exito'})
        this.passForm.reset()
      }),
      catchError((error)=>{
        if(error.error.message.includes('incorrecta')){
          this.passForm.get('Password')?.setErrors({wrongPass:true})
        }
        else{
          this.passForm.get('NewPassword')?.setErrors({FieldsEquals:true})
        }
        return of({})
      })
    ).subscribe()
  }

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
IsInvalidField(field:string):boolean|null{
  return this.ValidatorService.isValidField(this.passForm,field)
}
GetMessageError(field:string):string|null{
return this.ValidatorService.getFieldError(this.passForm,field)
}
}
