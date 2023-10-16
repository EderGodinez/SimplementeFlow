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
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SocialResposabilityComponent } from './pages/social-resposability/social-resposability.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ReturnPageComponent } from './pages/return-page/return-page.component';
import { LegalNoticePageComponent } from './pages/legal-notice-page/legal-notice-page.component';
import { FindUsPageComponent } from './pages/find-us-page/find-us-page.component';

const routes: Routes = [
  {path:'SimplementeFlow',component:LayoutPageComponent,
  children:[
    {path:'Home',component:HomePageComponent},
    {path:'login',component:LoginPageComponent},
    {path:'NewUser',component:NewUserPageComponent,
          children:[{path:'register',component:RegisterPageComponent},
                    {path:'VerifyAccount',component:VerifyAccountComponent},
                    {path:'Success',component:SuccessPageComponent},
                    {path:'**',redirectTo:'register'}]},
    {path:'Checkout',component:CheckoutPageComponent,
          children:[{path:'OrderSuccess',component:SuccessPageComponent},
                    {path:'**',redirectTo:''}]},
    {path:'Favorites',component:FavoritesPageComponent},
    {path:'Us',component:UsPageComponent},
    {path:'Contact',component:ContactPageComponent},
    {path:'SocialResposability',component:SocialResposabilityComponent},
    {path:'Orders',loadChildren:() => import('./orders/orders.module').then(m => m.OrdersModule)},
    {path:'Account',loadChildren:()=> import('./account/account.module').then(m=>m.AccountModule)},
    {path:'Products',loadChildren:()=>import('./products/products.module').then(m=>m.ProductsModule)},
    {path:'Return-policity',component:ReturnPageComponent},
    {path:'legal-notice',component:LegalNoticePageComponent},
    {path:'FindUs',component:FindUsPageComponent},
    {path:'**',redirectTo:'Home'},
  ]},
  {path:'Admin',loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:'Error',component:ErrorPageComponent},
  {path:'**',redirectTo:"SimplementeFlow"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
