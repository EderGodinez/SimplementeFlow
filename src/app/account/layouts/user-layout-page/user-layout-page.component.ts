import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserOptions } from 'src/app/interfaces/Headerinterfaces';
import { AuthService } from '../../services/Account.service';
import { MessageService } from 'primeng/api';
@Component({
  templateUrl: './user-layout-page.component.html',
  styleUrls: ['./user-layout-page.component.scss'],
  providers:[MessageService]
})
export class UserLayoutPageComponent {
  constructor(private Router:Router,private AuthService:AuthService,private Message:MessageService){}
userOptions:UserOptions[]=[
    {
        label:"Informacion de cuenta",
        icon:"bi bi-person-gear",
        url:"UserDatas"
    },{
        label:"Cambiar contraseña",
        icon:"bi bi-incognito",
        url:"ChangePassword"
    }
]
logOut:UserOptions={
        label:"Cerrar sesion",
        icon:"bi bi-box-arrow-in-left",
        url:"/SimplementeFlow/Home"
    }
LogOut(url:string){
  const {names,lastnames}=this.AuthService._User
  this.Message.add({severity:'info',detail:`Hasta luego ${names} ${lastnames}`,life:3000,summary:'Session finalizada'})
  setTimeout(() => {
    this.AuthService.logOut()
    this.AuthService.ResetUser()
    this.AuthService.IsLog=false
    this.Router.navigateByUrl(url)
  }, 3000);
}
}
