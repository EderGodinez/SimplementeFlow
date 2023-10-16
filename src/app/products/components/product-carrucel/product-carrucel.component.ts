
import { ProductsService } from '../../products.service';
import { Product } from './../../interfaces/product.interface';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Toast } from '../../interfaces';

@Component({
  selector: 'product-carrucel',
  templateUrl: './product-carrucel.component.html',
  styleUrls: ['./product-carrucel.component.scss']
})
export class ProductCarrucelComponent {
  constructor(private ProductService:ProductsService){
  }
  @Input()
  Title:string="";
  @Output() mensajeEnviado = new EventEmitter<Toast>();
 products:Product[]=this.ProductService.Getproducts();

}
