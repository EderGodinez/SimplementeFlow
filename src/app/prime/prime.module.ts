import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    PasswordModule,
    CheckboxModule,
    SidebarModule,
    ButtonModule
  ]
})
export class PrimeModule { }
