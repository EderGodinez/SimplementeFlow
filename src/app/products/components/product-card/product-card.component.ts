import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product,Sizes,Toast } from '../../interfaces/index';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],

})
export class ProductCardComponent implements OnInit {
  constructor(){}
  ngOnInit(): void {
    const {minKey,maxKey}=this.calculateMax_Min(this.Product)
    this.Max=maxKey;
    this.Min=minKey;
  }
  ImageUrl=`${environment.APIBaseUrl}/files/`
  @Input()
  Product:Product={
  _id: "",
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
  disadventages: [],
  Discount:0,
  inventoryStatus:"",
  RegisterDate:new Date(),
  __v: 0
}
@Output()
mensajeEnviado= new EventEmitter<Toast>();
Max?:number;
Min?:number;
handleCheckboxChange(isChecked: boolean,Product:Product) {
  const {ProductName,price,images}=Product;
  let Toast:Toast={
    summary:"",
    data:[]
}
  if (isChecked) {
     Toast={
      summary:ProductName+" añadido a favoritos",
      data:[`${images[0]}`,ProductName,price]}
  } else {
    Toast={
      summary:ProductName+" removido de tu lista",
      data:[`${images[0]}`,ProductName,price]}
  }
  this.mensajeEnviado.emit(Toast);
}
calculateMax_Min(Product:Product){
  let minKey = Infinity;
let maxKey = -Infinity;
const { sizes } = Product;
for (const key in sizes) {
  if (sizes.hasOwnProperty(key)) {
    const numericKey = parseFloat(key);
    if (!isNaN(numericKey)) {
      if (numericKey < minKey) {
        minKey = numericKey; // Actualiza la clave mínima si se encuentra una menor
      }
      if (numericKey > maxKey) {
        maxKey = numericKey; // Actualiza la clave máxima si se encuentra una mayor
      }
    }
  }
}
  return {
    maxKey,minKey
  }
}
}
