import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    PasswordModule,
    CheckboxModule
  ]
})
export class PrimeModule { }
