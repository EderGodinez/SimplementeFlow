import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../interfaces';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
interface ProductAction{
  ProductId:string
  size:number
  action:string
}
@Component({
  selector: 'favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent implements OnInit {
  constructor(private Router:Router){
  }
  ngOnInit(): void {

    const Productstock:number[]=Object.values(this.Product.sizes)
    let total=0;
    Productstock.forEach(element => {
      total+=element
    });
    if (total!=0) {
      this.Condition=1
    }
    else{
      this.Condition=2
    }
  }
  Condition!:number
  @Output()
  ProductAction:EventEmitter<ProductAction> = new EventEmitter<ProductAction>();
  @Input()
  Product:Product={
  _id:"",
  ProductName: "",
  description: "",
  price: 0,
  sizes: {},
  images: [],
  General: {
    patent: " ",
    model: " ",
    Category: " ",
    age: " ",
    width_type: " ",
    fit_type: " ",
    class_shoes: " ",
    E_Material: " ",
    I_Material: " ",
    Shoe_sole: " ",
  },
  adventages: [],
  disadventages: [],Discount:0,
  inventoryStatus:"",
  RegisterDate:new Date(),
  __v: 0
}
Delete(){
  const size=this.minSize
 this.ProductAction.emit({ProductId:this.Product._id,size,action:"delete"})
}
AddCar(){
  const size=this.minSize
  this.ProductAction.emit({ProductId:this.Product._id,size,action:"add car"})
}
SearchSimilar(){
  this.Delete()
  const productNameAtt=this.Product.ProductName.split(' ')
  const similar=`${productNameAtt[0]} ${productNameAtt[1]}`
  this.Router.navigateByUrl(`/Products/Search/${similar}`);
}
get minSize(){
  const keymin=Object.keys(this.Product.sizes).filter(key => this.Product.sizes[key] > 0).map(Number);;
  const ProductSize=Math.min(...keymin);
  return ProductSize
}
}
