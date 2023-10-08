import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss'],
  providers: [MessageService]
})
export class SuccessPageComponent implements OnInit{
  constructor(private Router:Router,private messageService: MessageService){}
  ngOnInit(): void {
     // Muestra el toast después de un breve retraso (por ejemplo, 1 segundo)
     setTimeout(() => {
      this.showSuccessToast();
    }, 1000);
  }
SingIn(){
  this.Router.navigateByUrl('SimplementeFlow/Home')
}
showSuccessToast() {
  this.messageService.add({ key: 'bc', severity: 'success', summary: 'Account created', detail: 'Thanks for your register' });
}
}
