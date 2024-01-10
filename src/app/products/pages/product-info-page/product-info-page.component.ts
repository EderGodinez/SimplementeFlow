import { AuthService } from 'src/app/account/services/Account.service';
import {  Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, Toast } from '../../interfaces';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
interface Addproduct{
  ProductId:string,
  size:number,
  quantity:number
}
@Component({
  templateUrl: './product-info-page.component.html',
  styleUrls: ['./product-info-page.component.scss'],
  providers: [MessageService]
})

export class ProductInfoPageComponent implements OnInit{
  constructor(private ProductsService:ProductsService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router:Router,
    private AuthService:AuthService){}
  ngOnInit() {
    // Recoge el valor del parámetro 'id' de la URL
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.ProductsService.GetProductById(id).subscribe({
        next:(product)=>{
          this.Similar=product.ProductName
          this.Product=product
          this.IsLike=this.AuthService._User.likes.includes(id)
        },
        error:(error)=>{
          console.log(error)
        }
      })
    });
  }
  Similar:string=''
  IsLike!:boolean
  public productForm: FormGroup=this.formBuilder.group({
    size:[0,[Validators.required]],
    quantity:[1,[Validators.required,Validators.min(1)]]
  })
mensajeToast:Toast={
  data:[],
  summary:""
}
ImagesBaseUrl:string=environment.APIBaseUrl+'/files/'
isSelect:boolean=false
selectedSize: string=""
titleCarrousel:string="Otros productos"
Product:Product={
  _id: "",
  ProductName: "",
  description: "",
  price: 0,
  sizes:{},
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


mostrarToast(isLike:boolean) {
  this.AuthService.AddLike(this.Product._id).subscribe({
    next:(response)=> {
      try{
        let TotalPrice:number=this.Product.price
        if (this.Product.Discount>0) {
          TotalPrice=this.Product.price*((100-this.Product.Discount)/100)
        }
        if (isLike) {
          this.mensajeToast={
           summary:response.message,
           data:[`${this.Product.images[0]}`,this.Product.ProductName,TotalPrice]}
           this.messageService.add(this.mensajeToast)
           this.AuthService.User.likes.push(this.Product._id)
          } else {
            this.mensajeToast={
              summary:response.message,
              data:[`${this.Product.images[0]}`,this.Product.ProductName,TotalPrice]}
              this.messageService.add(this.mensajeToast)
              const index=this.AuthService.User.likes.indexOf(this.Product._id)
              this.AuthService.User.likes.splice(index)
            }
          }
          catch{
            throw new Error('Este es un error de ejemplo');
          }
    },
    error:(err)=> {
      console.error(err)
    },
  })


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
  if (!this.AuthService.User._id) {
    this.router.navigateByUrl('SimplementeFlow/login')
    return
  }
  if(this.productForm.valid){

    const body={...this.productForm.value,ProductId:this.Product._id}
    this.AuthService.AddShoppingCar(body).subscribe({
      next:(value)=> {
        this.addCar(body)
        this.mensajeToast={
          data:[`${this.Product.images[0]}`,this.Product.ProductName,this.Product.price],
          summary:`${this.productForm.get('quantity')!.value} ${this.Product.ProductName} añadido a carrito"`
        }
        this.messageService.add(this.mensajeToast)
        this.productForm.reset()
      },
      error:(err)=> {
        console.error(err)
      },
    })

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
addCar(info:Addproduct){
  const{ProductId,quantity,size}=info
  const existProduct=this.AuthService.User.shopping_car.findIndex((product)=>product.ProductId===ProductId&&product?.size===size)
  if (existProduct===-1) {
    this.AuthService.User.shopping_car.push(info)
    return
  }
  this.AuthService.User.shopping_car[existProduct].quantity+=quantity
}
}
