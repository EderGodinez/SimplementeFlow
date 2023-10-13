import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { SearchPageComponent } from './pages/category-page/category-page.component';
import { SharedModule } from '../shared/shared.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductCarrucelComponent } from './components/product-carrucel/product-carrucel.component';


@NgModule({
  declarations: [
    SearchPageComponent,
    ProductCardComponent,
    ProductCarrucelComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
