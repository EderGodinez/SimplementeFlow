import { Injectable } from '@angular/core';
import { Product } from './interfaces/product.interface';

@Injectable({providedIn: 'root'})
export class ProductsService {
  constructor() { }
  Products:Product[]=[]
 Getproducts():Product[]{
  return this.Products
 }
 GetProductById(id:string):Product{
  return this.Products.filter(product=>product._id===id)[0]
 }
 GetProductsByCategory():Product[]{
 return this.Products
 }

}
