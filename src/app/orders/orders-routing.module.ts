import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderlistPageComponent } from './pages/orderlist-page/orderlist-page.component';
import { OrderDetailsPageComponent } from './pages/order-details-page/order-details-page.component';

const routes: Routes = [
  {path:'',
  children:[
    {path:'list',component:OrderlistPageComponent},
    {path:'list/:id',component:OrderDetailsPageComponent},
    {path:'**',redirectTo:'list'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
