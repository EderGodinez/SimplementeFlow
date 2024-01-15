import { AuthService } from 'src/app/account/services/Account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/products/interfaces';
import { ProductsService } from 'src/app/products/services/products.service';
import { MessageService } from 'primeng/api';
import { ShoppingCar } from 'src/app/interfaces/user.interfaces';
import { EMPTY, delay, finalize, of, switchMap, tap } from 'rxjs';
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
  this.size=window.innerWidth
  }
  filterSelected:string=""
  filterOptions:string[]=[]
  shoppingCarProductsCode:string[]=[]
  Products:Product[]=[]
  _Products:Product[]=[]
  IsLoad:boolean=false
  size!:number
  ngOnInit() {
    this.ProductService.SearchProducts('').pipe(
      tap((products: Product[]) => {
        const filteredProducts = products.filter(product =>
          this.AuthService.User.likes.includes(product._id)
          );
          this.Products.push(...filteredProducts.reverse());
          this._Products.push(...filteredProducts.reverse());
        }),
      finalize(() => {
          this.IsLoad = true;
      })
  ).subscribe();
    this.filterOptions = [
        'Añadidos recientemente',
        'Precio de mayor a menor',
        'Precio de menor a mayor',
        'Nivel de existencias',
        'Marcas de la A a la Z',
        'Marcas de la Z a la A',
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
  this._Products=this._Products.filter((product)=>product._id!=id)
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
SortProducts(){
  this.IsLoad=false
  setTimeout(() => {
    switch(this.filterSelected){
      case 'Añadidos recientemente':
        this.Products.reverse()
        break;
        case 'Precio de mayor a menor':
          this.Products.sort((a, b) => {
            const priceA = a.price;
            const priceB = b.price;
        if (priceA < priceB) {
            return 1; // Cambiado a -1 para orden ascendente (menor a mayor)
        } else if (priceA > priceB) {
            return -1; // Cambiado a 1 para orden ascendente (menor a mayor)
        } else {
            return 0;
    }
        });
          break;
          case 'Precio de menor a mayor':
            this.Products.sort((a, b) => {
              const priceA = a.price;
              const priceB = b.price;
          if (priceA < priceB) {
              return -1; // Cambiado a -1 para orden ascendente (menor a mayor)
          } else if (priceA > priceB) {
              return 1; // Cambiado a 1 para orden ascendente (menor a mayor)
          } else {
              return 0;
      }
          });
            break;
            case 'Nivel de existencias':
          this.Products.sort((productA,ProductB)=>{
            const sizesA:any=Object.values(productA.sizes).reduce((total, stock) =>  Number(total) + Number(stock), 0)
            const sizesB:any=Object.values(ProductB.sizes).reduce((total, stock) => Number(total) + Number(stock), 0)
            if (sizesA < sizesB) {
              return 1;
          } else if (sizesA > sizesB) {
              return -1;
          } else {
              return 0;
          }
          })
          break;
          case 'Marcas de la A a la Z':
            this.Products.sort((a, b) => {
              const patentNameA = a.General.patent;
              const patentNameB = b.General.patent;
          if (patentNameA < patentNameB) {
              return -1;
          } else if (patentNameA > patentNameB) {
              return 1;
          } else {
              return 0;
      }
          });
          break;
          case 'Marcas de la Z a la A':
            this.Products.sort((a, b) => {
              const patentNameA = a.General.patent;
              const patentNameB = b.General.patent;
          if (patentNameA < patentNameB) {
              return 1;
          } else if (patentNameA > patentNameB) {
              return -1;
          } else {
              return 0;
      }
          });
        break;
    }
    this.IsLoad=true
  }, 600);
}
}
