import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {RegisterPageService} from '../register-page/register-page.service'
@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  constructor(private router:Router,private RegisterPageService: RegisterPageService){}
  password:string=''
  Confirmpassword:string=''
  date: Date | undefined;
  VerifyAccount(){
this.router.navigateByUrl('SimplementeFlow/NewUser/VerifyAccount')
  }
}
