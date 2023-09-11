import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductInfoPageComponent } from './pages/product-info-page/product-info-page.component';
import { SearchPageComponent } from './pages/category-page/category-page.component';

const routes: Routes = [
  {path:'',children:[
    {path:'Search/:query',component:SearchPageComponent},
    {path:'Search/:query/:id',component:ProductInfoPageComponent},
    {path:'**',redirectTo:'Search/:query'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
