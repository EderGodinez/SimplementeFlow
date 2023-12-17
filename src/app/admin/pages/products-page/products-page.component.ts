import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AdminProductService } from '../../services/Adminproduct.service';
import { Product,  } from '../../../products/interfaces/product.interface';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
interface SaveProduct{
  closeDialog:boolean
  product:Product
  }
@Component({
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
  providers:[MessageService]
})

export class ProductsPageComponent implements OnInit,OnDestroy{
  constructor( private messageService: MessageService,private productService:AdminProductService) {
    this.product = {
      _id: "",
      ProductName: "",
      description: "",
      price: 0,
      sizes: {},
      images: [],
      General: {
      patent: "",
      model: "",
      Category: "",
      age: "",
      width_type: "",
      fit_type: "",
      class_shoes: "",
      E_Material: "",
      I_Material: "",
      Shoe_sole: ""
      },
      adventages: [],
      disadventages: [],
      Discount:0,
      inventoryStatus:"",
      RegisterDate:new Date(),
      __v: 0
    };
  }
  ngOnDestroy(): void {
    this.AJAX$.unsubscribe();
  }
  ngOnInit() {
    //this.productService.getProducts().then(data => this.products = data);
    this.cols = [
        { field: 'General.class_shoes', header: 'Clase de tenis' },
        { field: 'ProductName', header: 'Nombre de producto' },
        { field: 'price', header: 'Precio' },
        { field: 'RegisterDate', header: 'Fecha de Registro' },
        { field: 'General.patent', header: 'Marca' },
        { field: 'inventoryStatus', header: 'Estado de existencias' },
    ];
    this.InitProductList();
}

  public apiURL=environment.APIBaseUrl;
  productDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  products:Product[]= [];
  product: Product
  selectedProductIds: string[] = [];
  cols: any[] = [];
  EditProduct:boolean=false;
  rowsPerPageOptions = [5, 10, 20];
  AJAX$:Subscription=new Subscription();
  openNew() {
      this.ResetProduct()
      this.EditProduct=true;
      this.productDialog = true;
  }

  editProduct(product: Product) {
      this.product = { ...product };
      this.EditProduct=true;
      this.productDialog = true;
  }
  ViewProduct(product:Product){
      this.product = { ...product };
      this.EditProduct=false;
      this.productDialog = true;
  }
///TODO ESTA FUNCION SE ENCARGARA DE ELIMINAR LOS PRODUCTOS SELECCIONADOS
  confirmDeleteSelected() {
    for (let index = 0; index < this.selectedProductIds.length; index++) {
      const id = this.selectedProductIds[index];
      this.AJAX$=this.productService.DeleteProduct(id).subscribe({
        error:(err)=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 5000 });
          return
        }
      })
    }
    this.messageService.add({ severity: 'success', summary: 'Successful',
    detail: this.selectedProductIds.length>1?'Productos eliminados exitosamente':`Producto eliminado con id ${this.selectedProductIds[0]}`,
    life: 5000 });
    this.products=this.products.filter(product=>!this.selectedProductIds.includes(product._id))
    this.deleteProductsDialog=false
    this.selectedProductIds = [];
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

ResetProduct(){
  this.product = {
    _id: "",
    ProductName: "",
    description: "",
    price: 0,
    sizes: {},
    images: [],
    General: {
    patent: "",
    model: "",
    Category: "",
    age: "",
    width_type: "",
    fit_type: "",
    class_shoes: "",
    E_Material: "",
    I_Material: "",
    Shoe_sole: ""
    },
    adventages: [],
    disadventages: [],
    Discount:0,
    inventoryStatus:"",
    RegisterDate:new Date(),
    __v: 0
  };
}
async SaveProduct(info:SaveProduct){
const {closeDialog,product}=info
  if (!product._id) {
    //Todo conectar a backpara crear producto
   this.AJAX$=await this.productService.RegisterNewProduct(product)
    .subscribe({
      next:(Response)=>{
        this.products.push(Response.product)
        this.messageService.add({ severity: 'success', summary: 'Creado', detail: Response.message, life: 5000 });
      },
      error:(err)=>{this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 5000 });},
      complete:()=>{
        this.productDialog=closeDialog
        this.ResetProduct()
        return
      }
    })
  }
  else if(!this.AreObjectEquals(this.product,product)){
    //Todo conectar a back actualizar el producto
this.AJAX$=await this.productService.updateProduct(product._id,product)
.subscribe({
  next:(Response)=>{
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: Response.message, life: 5000 });
  },
  error:(err)=>{this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 5000 })},
  complete:()=>{
    const index=this.products.findIndex(productUpdate=>productUpdate._id===product._id)
    this.products[index]=product
    this.productDialog=closeDialog
    this.ResetProduct()
    return
  }
})}
  this.productDialog=closeDialog
}
async InitProductList(){
  await this.productService.getProducts().subscribe({
    next:(products)=>{
      this.products=products
    },
    error:(err)=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 5000 });
    },
    complete:()=>{
      this.messageService.add({ severity: 'success', summary: 'Listado de productos cargada de manera exitosa', life: 3000});
    }
  })
}
AreObjectEquals(product1:Product,product2:Product):boolean{
  const keys = Object.keys(product1);
  const key2 = Object.keys(product2);
  const Values1=Object.values(product1).sort()
  const Values2=Object.values(product2).sort()
  //Se cuenta lo que son el numero de propiedades para ver si son difentes
  if(keys.length!==key2.length){
    return false
  }
  for (let index = 0; index < Values1.length; index++) {
    //Primero se valida en caso de ser un valor en caso de ser iguales los objetos se continua
    if((typeof Values1[index])==='object'&&typeof (Values2[index]==='object')){
      if(this.AreObjectEquals(Values1[index],Values2[index]))
      continue
      else
      return false
    }
    if (Values1[index]!==Values2[index]) {
      return false
    }
  }
  return true
}
}
