import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductInfoPageComponent } from '../products/pages/product-info-page/product-info-page.component';



@NgModule({
  declarations: [
    ProductInfoPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ProductInfoPageComponent
  ]
})
export class SharedModule { }
