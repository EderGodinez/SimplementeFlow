import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeModule } from '../prime/prime.module';
import { ProductsRoutingModule } from './products-routing.module';
import { SearchPageComponent } from './pages/category-page/category-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductCarrucelComponent } from './components/product-carrucel/product-carrucel.component';
import { LikeButtonComponent } from './components/like-button/like-button.component';
import { ProductInfoPageComponent } from './pages/product-info-page/product-info-page.component';
import { GeneralDetailsPipe } from './pipes/general-details.pipe';
import { AddProductsPipe } from './pipes/add-products.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './components/product-list/product-list.component'; // Importa ReactiveFormsModule

@NgModule({
  declarations: [
    SearchPageComponent,
    ProductCardComponent,
    ProductCarrucelComponent,
    LikeButtonComponent,
    ProductInfoPageComponent,
    GeneralDetailsPipe,
    AddProductsPipe,
    ProductListComponent,

  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PrimeModule,
    ReactiveFormsModule
  ],
  exports:[
    SearchPageComponent,
    ProductCardComponent,
    ProductCarrucelComponent,
  ]
})
export class ProductsModule { }
