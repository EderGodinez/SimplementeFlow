import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../validators/validator.service';

@Component({
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {
  constructor(private FormBuilder:FormBuilder,private ValidatorService:ValidatorService){}
  public MessageForm:FormGroup=this.FormBuilder.group({
    Name:["",[Validators.required,Validators.pattern(this.ValidatorService.firstNameAndLastnamePattern)]],
    Email:["",[Validators.required,Validators.pattern(this.ValidatorService.emailPattern)]],
    Message:["",[Validators.required,Validators.maxLength(200)]]
  })
  onSubmit(){
    if (!this.MessageForm.valid) {
      console.log("Invalid form")
      this.MessageForm.reset()
      return
    }
    console.log("Message sent")
  }
}
