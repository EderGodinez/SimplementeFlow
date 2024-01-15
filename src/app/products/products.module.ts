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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FavoriteCardComponent } from './components/favorite-card/favorite-card.component';
import { CheckoutCardComponent } from './components/checkout-card/checkout-card.component';
import { InfoSkeletonComponent } from './components/infoSkeleton/infoSkeleton.component';


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
    FavoriteCardComponent,
    CheckoutCardComponent,

  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PrimeModule,
    ReactiveFormsModule,
    FormsModule,
    InfoSkeletonComponent
  ],
  exports:[
    SearchPageComponent,
    ProductCardComponent,
    ProductCarrucelComponent,
    FavoriteCardComponent,
    CheckoutCardComponent,
  ]
})
export class ProductsModule { }
