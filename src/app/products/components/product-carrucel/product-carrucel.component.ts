
import { ProductsService } from '../../services/products.service';
import { Product } from './../../interfaces/product.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toast } from '../../interfaces';
import { tap } from 'rxjs';

@Component({
  selector: 'product-carrucel',
  templateUrl: './product-carrucel.component.html',
  styleUrls: ['./product-carrucel.component.scss']
})
export class ProductCarrucelComponent implements OnInit {
  constructor(private ProductService:ProductsService){
  }
  ngOnInit(): void {
    const limit =8
    const skip=0
    switch(this.Title){
      case 'Nuevos productos':
        this.ProductService.GetProductsNews(limit).subscribe({
          next:(products)=> {
            this.products=products  
            },
            error:(err)=> {
              console.error(err)  
            }
        })
      break;
      case 'Ofertas':
        this.ProductService.GetProductsOffers(limit).subscribe({
          next:(products)=> {
          this.products=products  
          },
          error:(err)=> {
            console.error(err)
          },
        })
      break;
      case 'Otros productos':
        
        this.ProductService.GetSimilarProducts(this.ProductName,8).subscribe({
          next:(products)=> {
            this.products=products  
            },
            error:(err)=> {
              console.error(err)  
            }
        })
        break;
      default:
        this.ProductService.GetProductsByCategory(this.Title,limit).subscribe({
          next:(products)=> {
            this.products=products  
            },
            error:(err)=> {
              console.error(err)  
            }
        })
    }
    
  }
  @Input()
  Title:string="";
  @Input()
  ProductName:string="";
  @Output() mensajeEnviado = new EventEmitter<Toast>();
 products:Product[]=[];

}
