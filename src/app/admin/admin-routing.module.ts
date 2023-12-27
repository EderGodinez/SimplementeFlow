import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminlayoutPageComponent } from './pages/adminlayout-page/adminlayout-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MessagesPageComponent } from './components/messages-list/messages-list.component';
import { DetailMessageComponent } from './components/detail-message/detail-message.component';
import { AdminGuard, AdminLogoutGuard } from './guards/Admin.guard';

const routes: Routes = [
  {path:'login',component:LoginPageComponent,canActivate:[AdminLogoutGuard]},
  {path:'',component:AdminlayoutPageComponent,children:[
    {path:'dashboard',component:DashboardPageComponent},
    {path:'products',component:ProductsPageComponent},
    {path:'orders',component:OrdersPageComponent},
    {path:'messages',children:[
      {path:'list',component:MessagesPageComponent},
      {path:'detail/:id',component:DetailMessageComponent},
      {path:'**',redirectTo:'list'}
    ]},
    {path:'**',redirectTo:'dashboard'}
  ],canActivate:[AdminGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
