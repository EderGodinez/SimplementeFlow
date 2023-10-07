import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  constructor(private router:Router){}
  password:string=''
  Confirmpassword:string=''
  date: Date | undefined;
  VerifyAccount(){
this.router.navigateByUrl('SimplementeFlow/NewUser/VerifyAccount')
  }
}
