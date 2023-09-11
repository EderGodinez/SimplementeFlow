import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { PasswordPageComponent } from './pages/password-page/password-page.component';
import { UserDatasPageComponent } from './pages/user-datas-page/user-datas-page.component';


@NgModule({
  declarations: [
    PasswordPageComponent,
    UserDatasPageComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
