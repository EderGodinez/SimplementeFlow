import { AuthService } from 'src/app/account/services/Account.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product,Sizes,Toast } from '../../interfaces/index';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],

})
export class ProductCardComponent implements OnInit {
  constructor(private AuthService:AuthService){}
  ngOnInit(): void {
    const {minKey,maxKey}=this.calculateMax_Min(this.Product)
    this.Max=maxKey;
    this.Min=minKey;
    this.Islike=this.AuthService._User.likes.includes(this.Product._id)
  }
  Islike!:boolean
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
this.AuthService.AddLike(Product._id).subscribe({
  next:(response)=> {
    if (response.message.includes('agregado')) {
      this.AuthService.User.likes.push(Product._id)
    } else {
      const index=this.AuthService._User.likes.indexOf(Product._id)
      this.AuthService.User.likes.splice(index)
    }
    Toast={
      summary:response.message,
      data:[`${images[0]}`,ProductName,price]}
      this.mensajeEnviado.emit(Toast);
  },
  error:(err)=> {
    console.error(err)
  },
})
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
