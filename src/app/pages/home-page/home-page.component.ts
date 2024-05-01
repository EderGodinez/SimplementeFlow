import { Component } from '@angular/core';
import { adverticers,advertice } from './advertices';
import { Toast } from 'src/app/products/interfaces';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [MessageService]
})
export class HomePageComponent {
  constructor(private messageService: MessageService,private router:Router){
  }
BaseUrl:string="https://simplemente-flow.netlify.app"
  adverticers:advertice[]=adverticers
  CarouselTitles:string[]=["Nuevos productos","Hombres","Mujeres","Niños","Ofertas"]
  mensajeToast: Toast={
      summary:"",
      data:[],
  };
  mostrarToast(mensaje: Toast) {
    const {summary,data}=mensaje;
this.messageService.add({summary,data});
    try{
      this.mensajeToast = mensaje;
    }
    catch{
      throw new Error('Este es un error de ejemplo');
    }
  }
  NavigateFav(){
    this.router.navigate(['SimplementeFlow/Favorites'])
  }
}
