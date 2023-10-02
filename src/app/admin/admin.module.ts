import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminlayoutPageComponent } from './pages/adminlayout-page/adminlayout-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PrimeModule } from '../prime/prime.module';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BodyComponent } from './components/body/body.component';


@NgModule({
  declarations: [
    AdminlayoutPageComponent,
    DashboardPageComponent,
    ProductsPageComponent,
    CategoriesPageComponent,
    OrdersPageComponent,
    LoginPageComponent,
    SidenavComponent,
    BodyComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PrimeModule,
    AngularMaterialModule,
    FormsModule
  ]
})
export class AdminModule { }
