import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/products/interfaces';
import { ProductsService } from 'src/app/products/products.service';
interface option{
  name:string
  code:string
  }
@Component({
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent {
  constructor(private ProductService:ProductsService,private Router:Router){}
  filterSelected:string=""
  filterOptions:option[]=[]
  shoppingCarProductsCode:string[]=[]
  Products:Product[]=[]
  ngOnInit() {
    this.filterOptions = [
        { name: 'Añadidos recientemente', code: '' },
        { name: 'Precio de mayor a menor', code: '' },
        { name: 'Precio de menor a mayor', code: '' },
        { name: 'Nivel de existencias', code: '' },
        { name: 'Marcas de la A a la Z', code: '' },
        { name: 'Marcas de la Z a la A', code: '' }
    ];
    this.Products=[this.ProductService.GetProductById('1'),this.ProductService.GetProductById('2'),this.ProductService.GetProductById('3')]
}

get Condition():number{
return 3
}
ProductDelete:string="";
Delete(id:string){
  this.Products=this.Products.filter(item => item._id.$oid !== id);
}
AddCar(id:string){
  this.Delete(id)
}
SearchSimilar(id:string,productName:string){
  this.Delete(id)
  const productNameAtt=productName.split(' ')
  const similar=`${productNameAtt[0]} ${productNameAtt[1]}`
  this.Router.navigateByUrl(`SimplementeFlow/Products/Search/${similar}`);
}
}
