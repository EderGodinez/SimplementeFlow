import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces';

@Component({
  selector: 'favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent {
  constructor(){
  }
  @Output()
  deleteProduct:EventEmitter<string> = new EventEmitter<string>();
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

}
