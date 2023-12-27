import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
interface Data{
  Sumary:string
  Detail:string
}


@Component({
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss'],
  providers: [MessageService]
})
export class SuccessPageComponent implements OnInit{
  Info:Data={Detail:'',Sumary:''}
  constructor(private Router:Router,private messageService: MessageService){
    if (history.length===1) {
      this.Info={
        Detail:'Bienvenido a la comunidad de SimplementeFlow',
        Sumary:'Cuenta creada exitosamente'
      }
    }
    else{
      this.Info={
        Detail:'Tu pedido ah sido validado y pagado con exito',
        Sumary:'Compra realizada con exito '
      }
    }

  }
  ngOnInit(): void {
     setTimeout(() => {
      this.showSuccessToast();
    }, 1000);
  }
SingIn(){
  this.Router.navigateByUrl('SimplementeFlow/Home')
}
showSuccessToast() {
  this.messageService.add({ key: 'bc', severity: 'success', summary: 'Cuenta creada exitosamente', detail: 'Gracias por tu registro' });
}
}
