import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, Toast } from '../../interfaces';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  templateUrl: './product-info-page.component.html',
  styleUrls: ['./product-info-page.component.scss'],
  providers: [MessageService]
})
export class ProductInfoPageComponent implements OnInit {
  constructor(private ProductsService:ProductsService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router:Router){}
  ngOnInit() {
    // Recoge el valor del parámetro 'id' de la URL
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.ProductById(id)
    });
  }

  public productForm: FormGroup=this.formBuilder.group({
    size:['',[Validators.required]],
    quantity:[1,[Validators.required,Validators.min(1)]]
  })
mensajeToast:Toast={
  data:[],
  summary:""
}

isSelect:boolean=false
selectedSize: string=""
titleCarrousel:string="Otros productos"
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
  Discount:0,
  inventoryStatus:"",
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
GeneralArray =[this.Product.General];
ProductById(id:string){
  this.Product=this.ProductsService.GetProductById(id)
}

mostrarToast(isLike:boolean) {
  try{
    if (isLike) {
      this.mensajeToast={
       summary:this.Product.ProductName+" añadido a favoritos",
       data:[`${this.Product.images[0]}`,this.Product.ProductName,this.Product.price]}
       this.messageService.add(this.mensajeToast)
      } else {
        this.mensajeToast={
          summary:this.Product.ProductName+" removido de favoritos",
          data:[`${this.Product.images[0]}`,this.Product.ProductName,this.Product.price]}
          this.messageService.add(this.mensajeToast)
        }
      }
      catch{
        throw new Error('Este es un error de ejemplo');
      }

    }
    showMessage(mensaje: Toast) {
      const {summary,data}=mensaje;
  try{
    this.messageService.add({summary,data});
  }
  catch{
    throw new Error('Este es un error de ejemplo');
  }
}
addShoppingCar(){
  this.productForm.markAllAsTouched();
  if(this.productForm.valid){
    this.mensajeToast={
      data:[`${this.Product.images[0]}`,this.Product.ProductName,this.Product.price],
      summary:`${this.productForm.get('quantity')!.value} ${this.Product.ProductName} añadido a carrito"`
    }
    console.log(this.mensajeToast)
    this.messageService.add(this.mensajeToast)
    this.productForm.reset()
  }
  else{
    this.mensajeToast={
      data:[],
      summary:"Por favor seleccionar una talla y cantidad del producto antes de añadirlo a tu carrito"
    }
    this.productForm.reset()
    this.messageService.add(this.mensajeToast)
  }
}
Navigate(url:string){
  this.router.navigate([`SimplementeFlow/${url}`])
}
incrementQuantity() {
  const currentQuantity = this.productForm.get('quantity')!.value;
  this.productForm.get('quantity')!.setValue(currentQuantity + 1);
}

decrementQuantity() {
  const currentQuantity = this.productForm.get('quantity')!.value;
  if (currentQuantity > 1) {
    this.productForm.get('quantity')!.setValue(currentQuantity - 1);
  }
}
}
