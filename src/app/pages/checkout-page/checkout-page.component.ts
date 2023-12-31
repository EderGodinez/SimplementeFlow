import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products/services/products.service';
import { ProductOrder, checkoutList } from '../../interfaces/checkout.interface';
import { Router } from '@angular/router';
import { Sizes } from 'src/app/products/interfaces';
import { ShoppingCar } from 'src/app/interfaces/user.interfaces';
import { AuthService } from 'src/app/account/services/Account.service';
import { map, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { OrdersService } from 'src/app/orders/services/orders.service';


@Component({
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
  providers:[MessageService]
})
export class CheckoutPageComponent implements OnInit{
constructor(private productService:ProductsService,
  private Router:Router,
  private UserService:AuthService,
  private Message:MessageService,
  private OrdersService:OrdersService ){}
  ngOnInit(): void {
    //SE obtiene la informacion de los productos en basea su id
    this.UserService._User.shopping_car.forEach(product => {
    this.productService.GetProductById(product.ProductId).pipe(
      map((product)=>{
        const {RegisterDate,__v,adventages,disadventages,inventoryStatus,General,...info}=product;
      const {patent}=product.General
        return {...info,patent}
      }),
      tap((CheckoutInfo)=>{
        const {Discount,ProductName,_id,description,images,patent,price,sizes}=CheckoutInfo
        const dataCheckout:ProductOrder={
          patent,
          _id:_id,
          productName: ProductName, // Descripción del producto
          productDescription:description,
          Image: images[0],
          Size:product.size?product.size:0,
          Amount: product.quantity,
          Price:price*((100-Discount)/100)
        }
        this.AllowSizes=sizes
        this.Checkoutlist.Details.push(dataCheckout)
        this.CalculateTotal()
      })
    ).subscribe()
  });
  this.Checkoutlist.UserId=this.UserService.User._id
}
AllowSizes:Sizes={}
Checkoutlist:checkoutList={
UserId:"",
Details:[]
}
totalPay: number = 0;

//Representa el carrito de compras del usuario
CalculateTotal(){
  this.totalPay=this.Checkoutlist.Details.reduce((total, product) => total + (product.Price * product.Amount), 0)
}
deleteProduct(id:string){
 this.Checkoutlist.Details= this.Checkoutlist.Details.filter(product=>product._id!==id)
 this.UserService._User.shopping_car=this.UserService._User.shopping_car.filter(car=>car.ProductId!==id)
 this.UserService.UpdateInfo(this.UserService.User).subscribe({
  next:(value)=> {
    this.Message.add({severity:'info',life:3000,summary:'Producto eliminado de carrito'})
  },
  error:(err)=> {
    console.error(err)
  },
 })
 this.CalculateTotal()
}
ModifyQuantity(data:{id:string,quantity:number}){
  const productoParaIncrementar = this.UserService._User.shopping_car.find(producto => producto.ProductId === data.id);
  if (productoParaIncrementar) {
    // Si se encontró el producto, incrementa la cantidad
    productoParaIncrementar.quantity += data.quantity;
    this.CalculateTotal()
    if (productoParaIncrementar.quantity<1) {
      this.deleteProduct(data.id);
    }
  }
}
CreateCheckOut(){
this.OrdersService.createOrder(this.Checkoutlist).subscribe({
next:({url})=> {
  window.open(url)
},
error:(err)=> {
  this.Message.add({life:3000,summary:'Error al intentar realizar pedido',severity:'error',detail:err.error.message})
},
})
}
GoHome(){
this.Router.navigate(['SimplementeFlow/Home'])
}
}
