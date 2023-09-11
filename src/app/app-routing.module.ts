import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NewUserPageComponent } from './pages/new-user-page/new-user-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { UsPageComponent } from './pages/us-page/us-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';

const routes: Routes = [
  {path:'SimplementeFlow',
  children:[
    {path:'Home',component:HomePageComponent},
    {path:'NewUser',component:NewUserPageComponent},
    {path:'Checkout',component:CheckoutPageComponent},
    {path:'Favorites',component:FavoritesPageComponent},
    {path:'Us',component:UsPageComponent},
    {path:'Contact',component:ContactPageComponent},
    {path:'Orders',loadChildren:() => import('./orders/orders.module').then(m => m.OrdersModule)},
    {path:'Account',loadChildren:()=> import('./account/account.module').then(m=>m.AccountModule)},
    {path:'Products',loadChildren:()=>import('./products/products.module').then(m=>m.ProductsModule)},
    {path:'**',redirectTo:'Home'},
  ]},
  {path:'**',redirectTo:'SimplementeFlow'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
