import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product,Sizes,Toast } from '../../interfaces/index';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],

})
export class ProductCardComponent {
  constructor(){
    const {minKey,maxKey}=this.calculateMax_Min(this.Product)
    this.Max=maxKey;
    this.Min=minKey;
  }
  @Input()
  Product:Product={
  _id: {
    $oid: "0"
  },
  ProductName: "",
  description: "",
  price: 0,
  sizes: {
    20: 0,
    21: 0,
    22: 0,
    23: 0,
    24: 0,
    25: 0,
    26: 0,
    27: 0,
    28: 0,
    29: 0,
    30: 0
  },
  images: [],
  General: {
    patent: " ",
    model: " ",
    Gender: " ",
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
  __v: 0
}
@Output()
mensajeEnviado= new EventEmitter<Toast>();
Max:number;
Min:number;
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
const { sizes }: { sizes: Sizes } = Product;
for (const key in sizes) {
  if (sizes.hasOwnProperty(key)) {
    const numericKey = Number(key);
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
