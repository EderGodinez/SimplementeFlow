import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NewUserPageComponent } from './pages/new-user-page/new-user-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { UsPageComponent } from './pages/us-page/us-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { VerifyAccountComponent } from './pages/verify-account/verify-account.component';
import { SuccessPageComponent } from './pages/success-page/success-page.component';
import { AppLayoutComponent } from './layout/app.layout.component';
const routes: Routes = [
  {path:'',component:AppLayoutComponent,children:[
  //{path:'SimplementeFlow',component:LayoutPageComponent,}
  // children:[
  //   {path:'Home',component:HomePageComponent},
  //   {path:'NewUser',component:NewUserPageComponent,
  //         children:[{path:'VerifyAccount',component:VerifyAccountComponent},
  //                   {path:'Success',component:SuccessPageComponent},
  //                   {path:'**',redirectTo:''}]},
  //   {path:'Checkout',component:CheckoutPageComponent,
  //         children:[{path:'OrderSuccess',component:SuccessPageComponent},
  //                   {path:'**',redirectTo:''}]},
  //   {path:'Favorites',component:FavoritesPageComponent},
  //   {path:'Us',component:UsPageComponent},
  //   {path:'Contact',component:ContactPageComponent},
  //   {path:'Orders',loadChildren:() => import('./orders/orders.module').then(m => m.OrdersModule)},
  //   {path:'Account',loadChildren:()=> import('./account/account.module').then(m=>m.AccountModule)},
  //   {path:'Products',loadChildren:()=>import('./products/products.module').then(m=>m.ProductsModule)},
  //   {path:'**',redirectTo:'Home'},
  // ]},
  // {path:'Admin',loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
  // {path:'**',redirectTo:'SimplementeFlow'}
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
