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
  __v: 0
}

}
