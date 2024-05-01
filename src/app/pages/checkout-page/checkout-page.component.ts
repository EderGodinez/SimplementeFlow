import { checkoutList } from './../../interfaces/checkout.interface';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products/services/products.service';
import { ProductOrder } from '../../interfaces/checkout.interface';
import { Router } from '@angular/router';
import { Sizes } from 'src/app/products/interfaces';
import { ShoppingCar } from 'src/app/interfaces/user.interfaces';
import { AuthService } from 'src/app/account/services/Account.service';
import { finalize, map, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { OrdersService } from 'src/app/orders/services/orders.service';
interface DeleteProductInfo{
  id:string
  size:number
}

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
    if (this.UserService._User.shopping_car.length>0) {
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
            const stock=Object.values(this.AllowSizes).reduce((size,total)=>total+size,0)
            console.log(stock)
            if (stock>0) {
              this.Checkoutlist.Details.push(dataCheckout)
              this.CalculateTotal()
            }
            else{
              this.ClearNoStockProducts(dataCheckout._id,dataCheckout.productName)
            }
          }),
          finalize(()=>{
            this.Isload=true
          })
          ).subscribe()
      });
    }
    else{
      this.Isload=true
    }
  this.Checkoutlist.UserId=this.UserService.User._id
}
AllowSizes:Sizes={}
Checkoutlist:checkoutList={
UserId:"",
Details:[]
}
Isload:boolean=false

totalPay: number = 0;

//Representa el carrito de compras del usuario
CalculateTotal(){
  this.totalPay=this.Checkoutlist.Details.reduce((total, product) => total + (product.Price * product.Amount), 0)
}
deleteProduct(deleteProduct:DeleteProductInfo){
  const{id,size}=deleteProduct
  this.RemoveProductAtUser(id,size)
 this.UserService.UpdateInfo(this.UserService._User).subscribe({
  next:(value)=> {
    this.Message.add({severity:'info',life:3000,summary:'Producto eliminado de carrito'})
  },
  error:(err)=> {
    console.error(err)
  },
 })
 this.CalculateTotal()
}
RemoveProductAtUser(id:string,size:number){
  const productIndex: number = this.Checkoutlist.Details.findIndex((product) => {
    return product._id === id && product.Size === size;
  });
  this.Checkoutlist.Details.splice(productIndex, 1);
  const UproductIndex: number = this.UserService._User.shopping_car.findIndex((product) => {
    return product.ProductId === id && product.size === size;
  });
  this.UserService.User.shopping_car.splice(UproductIndex,1)
}
ClearNoStockProducts(id:string,productname:string){
  this.Checkoutlist.Details=this.Checkoutlist.Details.filter((product)=>product._id!==id);
  this.UserService.User.shopping_car=this.UserService.User.shopping_car.filter((product)=>product.ProductId!==id)
  this.UserService.UpdateInfo(this.UserService._User).subscribe({
    next:(value)=> {
      this.Message.add({severity:'info',life:3000,summary:`${productname} eliminado de carrito por falta de stock`})
    },
    error:(err)=> {
      console.error(err)
    },
   })

}
ModifyQuantity(data:{id:string,quantity:number,size:number}){
  const productoParaIncrementar = this.UserService._User.shopping_car.find(producto => producto.ProductId === data.id);
  if (productoParaIncrementar) {
    // Si se encontró el producto, incrementa la cantidad
    productoParaIncrementar.quantity += data.quantity;
    this.CalculateTotal()
    if (productoParaIncrementar.quantity<1) {
      this.deleteProduct({id:data.id,size:data.size});
    }
  }
}
CreateCheckOut(){
  if(this.UserService._User.data_Address.Street){
    this.Checkoutlist.Details.map((product)=>{
      if (typeof product.Size==='string') {
        product.Size = parseFloat(product.Size);
      }
      return product
      })
    this.OrdersService.createOrder({UserId:this.UserService._User._id,Details:this.UserService._User.shopping_car}).subscribe({
    next:({url})=> {
      window.location.href=url
    },
    error:(err)=> {
      this.Message.add({life:3000,summary:'Error al intentar realizar pedido',severity:'error',detail:err.error.message})
    },
    })
  }
  else{
    this.Message.add({life:5000,summary:'Error al intentar realizar pedido',severity:'error',detail:'Necesitas tener una direccion de envio'})
    setTimeout(() => {
      this.Router.navigateByUrl('SimplementeFlow/Account/UserDatas')
    }, 6000);
  }
}
GoHome(){
this.Router.navigate(['SimplementeFlow/Home'])
}
}
