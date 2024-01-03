import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products/services/products.service';
import { checkoutList } from './checkout.interface';
import { Router } from '@angular/router';
import { Sizes } from 'src/app/products/interfaces';
import { ShoppingCar } from 'src/app/interfaces/user.interfaces';
import { AuthService } from 'src/app/account/services/Account.service';
import { map, tap } from 'rxjs';


@Component({
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit{
constructor(private productService:ProductsService,private Router:Router,private UserService:AuthService){}
  ngOnInit(): void {
    //SE obtiene la informacion de los productos en basea su id
    this.shoppingCard=this.UserService._User.shopping_car
    this.shoppingCard.forEach(product => {
    const result=this.productService.GetProductById(product.ProductId).pipe(
      map((product)=>{
        const {RegisterDate,__v,adventages,disadventages,inventoryStatus,General,...info}=product;
      const {patent,Category}=product.General
        return {...info,patent,Category}
      }),
      tap((CheckoutInfo)=>{
        const {Discount,Category,ProductName,_id,description,images,patent,price,sizes}=CheckoutInfo
        const dataCheckout:checkoutList={
          Category:Category,
          _id:_id,
          patent:patent,
          productName: ProductName, // Descripción del producto
          productDescription:description,
          Image: images[0],
          Size:product.size,
          Amount: product.quantity,
          Price:price,
          Discount
        }
        this.AllowSizes=sizes
        this.Checkoutlist.push(dataCheckout)
      })
    ).subscribe()
  });
  this.CalculateTotal()
}
AllowSizes:Sizes={}
Checkoutlist:checkoutList[]=[]
totalPay: number = 0;

//Representa el carrito de compras del usuario
shoppingCard:ShoppingCar[]=[]
CalculateTotal(){
  this.totalPay=this.Checkoutlist.reduce((total, product) => total + (product.Price * product.Amount), 0)
}
deleteProduct(id:string){
 this.Checkoutlist= this.Checkoutlist.filter(product=>product._id!==id)
 this.shoppingCard=this.shoppingCard.filter(car=>car.ProductId!==id)
 this.CalculateTotal()
}
ModifyQuantity(data:{id:string,quantity:number}){
  const productoParaIncrementar = this.shoppingCard.find(producto => producto.ProductId === data.id);
  if (productoParaIncrementar) {
    // Si se encontró el producto, incrementa la cantidad
    productoParaIncrementar.quantity += data.quantity;
    this.CalculateTotal()
    if (productoParaIncrementar.quantity<1) {
      this.deleteProduct(data.id);
    }
  }
}
GoHome(){
this.Router.navigate(['SimplementeFlow/Home'])
}
}
