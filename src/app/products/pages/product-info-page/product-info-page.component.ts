import { Component } from '@angular/core';
import { ProductsService } from '../../products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces';

@Component({
  templateUrl: './product-info-page.component.html',
  styleUrls: ['./product-info-page.component.scss']
})
export class ProductInfoPageComponent {
constructor(private ProductsService:ProductsService,private route: ActivatedRoute){}
ngOnInit() {
  // Recoge el valor del parámetro 'id' de la URL
  this.route.params.subscribe(params => {
    const id = params['id'];
    this.ProductById(id)
  });
}
print(value:any){
  console.log(value)
}
titleCarrousel:string="Similares"
Quantity:number[]=[1,2,3,4,5,6,7,8,9,10]
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
    _id: {
      $oid: ""
    }
  },
  adventages: [],
  disadventages: [],
  __v: 0
}
responsiveOptions: any[] = [
  {
      breakpoint: '1024px',
      numVisible: 5
  },
  {
      breakpoint: '768px',
      numVisible: 3
  },
  {
      breakpoint: '560px',
      numVisible: 1
  }
];
ProductById(id:string){
  this.Product=this.ProductsService.GetProductById(id)
}
}
