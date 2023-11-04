import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserOptions } from 'src/app/interfaces/Headerinterfaces';
@Component({
  templateUrl: './user-layout-page.component.html',
  styleUrls: ['./user-layout-page.component.scss']
})
export class UserLayoutPageComponent {
  constructor(private Router:Router){}
userOptions:UserOptions[]=[
    {
        label:"Informacion de cuenta",
        icon:"bi bi-person-gear",
        url:"UserDatas"
    },{
        label:"Cambiar comtraseña",
        icon:"bi bi-incognito",
        url:"ChangePassword"
    },{
        label:"Cerrar sesion",
        icon:"bi bi-box-arrow-in-left",
        url:"/SimplementeFlow/Home"
    }
]
LogOut(url:string){
  this.Router.navigate([`SimplemeteFlow/${url}`])
}
}
