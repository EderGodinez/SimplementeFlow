import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { StepsModule } from 'primeng/steps';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    PasswordModule,
    CheckboxModule,
    SidebarModule,
    ButtonModule,
    InputTextModule,
    DividerModule,
    OverlayPanelModule,
    ToastModule,
    CalendarModule,
    StepsModule
  ]
})
export class PrimeModule { }
