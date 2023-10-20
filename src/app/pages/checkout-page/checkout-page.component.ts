import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products/products.service';
import { checkoutList } from './checkout.interface';
import { Id } from '../../products/interfaces/product.interface';
interface shppingCard{
  ProductId:string
  quantity:number
  size:number
}
@Component({
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit{
constructor(private productService:ProductsService){}
  ngOnInit(): void {
    //SE obtiene la informacion de los productos en basea su id
  this.shoppingCard.forEach(product => {
    const result=(this.productService.GetProductById(product.ProductId))
    const {ProductName,description,images,price,General,_id}=result;
    const dataCheckout:checkoutList={
      age:General.age,
      id:_id.$oid,
      patent:General.patent,
      productName: ProductName, // Descripción del producto
      productDescription:description,
      Image: images[0],
      Size:product.size,
      Amount: product.quantity,
      Price:price
    }
this.totalPay+=product.quantity*price
    this.Checkoutlist.push(dataCheckout)
  });
  console.log(this.totalPay)
}
totalPay:number=0
shoppingCard:shppingCard[]=[
  {ProductId:'1',quantity:2,size:22},
  {ProductId:'2',quantity:4,size:26.5},
  {ProductId:'4',quantity:1,size:27}
]
Checkoutlist:checkoutList[]=[]
}
