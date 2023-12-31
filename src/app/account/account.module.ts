import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { PasswordPageComponent } from './pages/password-page/password-page.component';
import { UserDatasPageComponent } from './pages/user-datas-page/user-datas-page.component';
import { UserLayoutPageComponent } from './layouts/user-layout-page/user-layout-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from '../prime/prime.module';
import { ValidatorService } from '../validators/validator.service';
import { PatternError } from '../pipes/EmailPatternError.pipe';


@NgModule({
  providers:[ValidatorService],
  declarations: [
    PasswordPageComponent,
    UserDatasPageComponent,
    UserLayoutPageComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    PrimeModule,
    PatternError
  ]
})
export class AccountModule { }
