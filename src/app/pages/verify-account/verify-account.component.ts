import { Component } from '@angular/core';
import {RegisterPageService} from '../register-page/register-page.service'
@Component({
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent {
  constructor(private RegisterPageService: RegisterPageService) {
    this.email=RegisterPageService.email
  }
  email:string=""
}
