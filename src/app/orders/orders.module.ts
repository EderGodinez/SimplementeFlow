import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderlistPageComponent } from './pages/orderlist-page/orderlist-page.component';
import { OrderDetailsPageComponent } from './pages/order-details-page/order-details-page.component';
import { PrimeModule } from '../prime/prime.module';


@NgModule({
  declarations: [
    OrderlistPageComponent,
    OrderDetailsPageComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    PrimeModule
  ]
})
export class OrdersModule { }
