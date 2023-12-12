import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products/products.service';
import { checkoutList } from './checkout.interface';
import { Router } from '@angular/router';
import { Sizes } from 'src/app/products/interfaces';
import { ShoppingCar } from 'src/app/interfaces/user.interfaces';


@Component({
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit{
constructor(private productService:ProductsService,private Router:Router){}
  ngOnInit(): void {
    //SE obtiene la informacion de los productos en basea su id
    this.shoppingCard.forEach(product => {
    const result=this.productService.GetProductById(product.ProductId)
    const {ProductName,description,images,price,General,_id,sizes}=result;
    const dataCheckout:checkoutList={
      age:General!.age,
      id:_id!,
      patent:General!.patent,
      productName: ProductName, // Descripción del producto
      productDescription:description,
      Image: images[0],
      Size:product.size,
      Amount: product.quantity,
      Price:price
    }
    this.AllowSizes=sizes
    this.Checkoutlist.push(dataCheckout)
  });
  this.CalculateTotal()
}
AllowSizes:Sizes={}
Checkoutlist:checkoutList[]=[]
totalPay: number = 0;

//Representa el carrito de compras del usuario
shoppingCard:ShoppingCar[]=[
  {ProductId:'1',quantity:2,size:22},
  {ProductId:'2',quantity:4,size:26},
  {ProductId:'4',quantity:1,size:27}
]
CalculateTotal(){
  this.totalPay=this.Checkoutlist.reduce((total, product) => total + (product.Price * product.Amount), 0)
}
deleteProduct(id:string){
 this.Checkoutlist= this.Checkoutlist.filter(product=>product.id!==id)
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
this.Router.navigate(['Home'])
}
}
