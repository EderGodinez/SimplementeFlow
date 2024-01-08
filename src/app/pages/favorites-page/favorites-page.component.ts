import { AuthService } from 'src/app/account/services/Account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/products/interfaces';
import { ProductsService } from 'src/app/products/services/products.service';
import { MessageService } from 'primeng/api';
import { ShoppingCar } from 'src/app/interfaces/user.interfaces';
interface option{
  name:string
  code:string
  }
  interface ProductAction{
    ProductId:string
    size:number
    action:string
  }
@Component({
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
  providers:[MessageService]
})
export class FavoritesPageComponent implements OnInit {
  constructor(private ProductService:ProductsService,private AuthService:AuthService,private Router:Router,private Message:MessageService){
  }
  filterSelected:string=""
  filterOptions:option[]=[]
  shoppingCarProductsCode:string[]=[]
  Products:Product[]=[]
  ngOnInit() {
this.AuthService._User.likes.forEach((ProductId)=>{
  this.ProductService.GetProductById(ProductId).subscribe({
    next:(Product)=> {
      this.Products.push(Product)
    },
    error:(error)=> {
      console.error(error)
    },
  })
})
    this.filterOptions = [
        { name: 'Añadidos recientemente', code: '' },
        { name: 'Precio de mayor a menor', code: '' },
        { name: 'Precio de menor a mayor', code: '' },
        { name: 'Nivel de existencias', code: '' },
        { name: 'Marcas de la A a la Z', code: '' },
        { name: 'Marcas de la Z a la A', code: '' }
    ];
}
HandleAction(Action:ProductAction){
  const {ProductId,size,action}=Action
if (Action.action.includes('add')) {
  this.AuthService.AddShoppingCar({ProductId,quantity:1,size}).subscribe({
    next:(value)=> {
      this.AddProdductShopppingCar({ProductId:Action.ProductId,quantity:1,size})
      this.Message.add({life:3000,summary:'Producto agregado',detail:value.message,severity:'info'})
    },
    error:(err)=> {
      this.Message.add({life:3000,summary:'Error al agregar producto',detail:err.error.message,severity:'error'})
    },
  })
} else {
  this.AuthService.AddLike(Action.ProductId).subscribe({
    next:(value)=> {
      console.log(value.message)
    },
    error:(err)=> {
      console.error(err)
    },
    complete:()=> {
      this.Delete(Action.ProductId)
    },
  })
}
}
Delete(id:string){
  const index=this.AuthService._User.likes.indexOf(id)
  this.AuthService.User.likes.splice(index)
  this.Products=this.Products.filter((product)=>product._id!=id)
}
AddCar(id:string){

  this.AuthService.User.shopping_car.push({ProductId:id,quantity:1})
}
GoHome(){
  this.Router.navigate(['Home'])
  }
  AddProdductShopppingCar(ProductInfo:ShoppingCar){
    const Exist=this.AuthService.User.shopping_car.findIndex((product)=>product.ProductId===ProductInfo.ProductId)
    if (Exist===-1) {
      this.AuthService.User.shopping_car.push(ProductInfo)
      return
    }
    this.AuthService.User.shopping_car[Exist].quantity+=ProductInfo.quantity


}
}
