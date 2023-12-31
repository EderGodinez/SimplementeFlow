import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminlayoutPageComponent } from './pages/adminlayout-page/adminlayout-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PrimeModule } from '../prime/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BodyComponent } from './components/body/body.component';
import { FilesService } from './services/file.service';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { AdventagesFormComponent } from './components/adventages-form/adventages-form.component';
import { GeneralInformationFormComponent } from './components/general-information-form/general-information-form.component';
import { MessagesPageComponent } from './components/messages-list/messages-list.component';
import { DetailMessageComponent } from './components/detail-message/detail-message.component';
import { PatternError } from '../pipes/EmailPatternError.pipe';



@NgModule({
  declarations: [
    AdminlayoutPageComponent,
    DashboardPageComponent,
    ProductsPageComponent,
    OrdersPageComponent,
    LoginPageComponent,
    SidenavComponent,
    BodyComponent,
    ProductInfoComponent,
    AdventagesFormComponent,
    GeneralInformationFormComponent,
    MessagesPageComponent,
    DetailMessageComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    PatternError
  ],
  providers:[FilesService]
})
export class AdminModule { }
