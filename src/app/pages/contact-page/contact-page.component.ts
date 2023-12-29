import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../validators/validator.service';
import { catchError, finalize, of, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { MailService } from 'src/app/admin/services/Mail.service';

@Component({
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  providers:[MessageService]
})
export class ContactPageComponent {
  constructor(private FormBuilder:FormBuilder,private ValidatorService:ValidatorService,private Message:MessageService,private Mail:MailService){}
  public MessageForm:FormGroup=this.FormBuilder.group({
    username:["",[Validators.required,Validators.pattern(this.ValidatorService.firstNameAndLastnamePattern)]],
    UserEmail:["",[Validators.required,Validators.pattern(this.ValidatorService.emailPattern)]],
    issue:["",[Validators.required]],
    Content:["",[Validators.required,Validators.minLength(50),Validators.maxLength(200)]]
  })
  optionsIssues:string[]=[
    '','Cancelacion de pedido','Precio especial','Compra de mayoreo','Disponibilidad de un modelo','Descuentos','Asunto personalizado'
  ]
  onSubmit(){
    if (!this.MessageForm.valid) {
      this.MessageForm.reset()
      return
    }
    this.Mail.SentMessage(this.MessageForm.value).pipe(
      tap((response)=>{
        this.Message.add({severity:'success',life:3000,summary:'Mensaje enviado',detail:`Mensaje enviado en seguida se le notificara al correo ${response.UserEmail}`})
      }
    ),catchError((error) => {
  this.Message.add({detail:error.message,severity:'error',life:3000,summary:'Error al enviar mensaje'})
   return of([]);
  }),
      finalize(()=>{
        this.MessageForm.reset()
      })
    ).subscribe()
  }
}
