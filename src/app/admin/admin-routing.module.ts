import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminlayoutPageComponent } from './pages/adminlayout-page/adminlayout-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  {path:'login',component:LoginPageComponent},
  {path:'',component:AdminlayoutPageComponent,children:[
    {path:'dashboard',component:DashboardPageComponent},
    {path:'Products',component:ProductsPageComponent},
    {path:'Categories',component:CategoriesPageComponent},
    {path:'Orders',component:OrdersPageComponent},
    {path:'**',redirectTo:'dashboard'}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
