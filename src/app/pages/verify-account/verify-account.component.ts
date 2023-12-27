import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/account/services/Account.service';
@Component({
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnDestroy {
  constructor(private AuthService: AuthService) {
    this.email=this.AuthService._User.email
  }
  ngOnDestroy(): void {
    this.AuthService.isValidRegister=false
  }
  email:string=""
}
