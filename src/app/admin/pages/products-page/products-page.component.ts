import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductService } from './services/product.service';
import { Table } from 'primeng/table';
import { FileUploadEvent } from 'primeng/fileupload';
import { FileService } from './services/file.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface sizes{
  size:number
  quantity:number
}
class sizes implements sizes{
  size=0;
  quantity=0;
}
@Component({
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
  providers:[MessageService]
})

export class ProductsPageComponent {
  productDialog: boolean = false;
  AdventageDialog:boolean=false
  deleteProductDialog: boolean = false;
  CaracteristicsDialog:boolean=false

  deleteProductsDialog: boolean = false;

  products: any[] = [];

  product: any = {};

  selectedProducts: any[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  uploadedFiles: any[] = [];

  ProductSizes:sizes[]=[
    {
      size:0,
      quantity:0
    }
  ]
  adventages:string[]=[""]
  disaventages:string[]=[""]

  constructor( private messageService: MessageService,private fileService:FileService,private FB:FormBuilder) {

  }
  // Crea un FormGroup para cada par de tamaño y cantidad
  sizeQuantityControls = this.ProductSizes.map(item => {
    return this.FB.group({
      size: item.size,
      quantity: item.quantity
    });
  });
  public ProductMainForm:FormGroup=this.FB.group({
    ProductInfoForm:[this.FB.group({
      ProductName:[[Validators.required]],
      ProductDescription:[[Validators.required]],
      ProductStatus:[[Validators.required]],
      ProductPrice:[[Validators.required]],
      ProductDiscount:[[Validators.required,Validators.min(0),Validators.max(100)]],
      Sizes:this.FB.array(this.sizeQuantityControls,[Validators.required,Validators.minLength(1),Validators.maxLength(5)])
    }),[Validators.required]],
    AdventagesForm:[this.FB.group({
      Adventages:this.FB.array(this.adventages,[Validators.required,Validators.minLength(1),Validators.maxLength(5)]),
      Disaventages:this.FB.array(this.disaventages,[Validators.required,Validators.minLength(1),Validators.maxLength(5)])
    }),[Validators.required]],
    CaracteristicsForm:[this.FB.group({
      Pattent:[[Validators.required]],
      Model:[[Validators.required]],
      Category:[[Validators.required]],
      age:[[Validators.required]],
      width_type:[[Validators.required]],
      fit_type:[[Validators.required]],
      class_shoes:[[Validators.required]],
      E_Material:[[Validators.required]],
      I_Material:[[Validators.required]],
      Shoe_sole:[[Validators.required]],
    }),[Validators.required]]
  })
  ngOnInit() {
      //this.productService.getProducts().then(data => this.products = data);

      this.cols = [
          { field: 'product', header: 'Product' },
          { field: 'price', header: 'Price' },
          { field: 'category', header: 'Category' },
          { field: 'rating', header: 'Reviews' },
          { field: 'inventoryStatus', header: 'Status' }
      ];

      this.statuses = [
          { label: 'Disponibilidad', value: 'instock' },
          { label: 'Poco stock', value: 'lowstock' },
          { label: 'Sin stock', value: 'outofstock' }
      ];
  }

  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(product: any) {
      this.product = { ...product };
      this.productDialog = true;
  }

  deleteProduct(product: any) {
      this.deleteProductDialog = true;
      this.product = { ...product };
  }

  confirmDeleteSelected() {
      this.deleteProductsDialog = false;
      this.products = this.products.filter(val => !this.selectedProducts.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      this.selectedProducts = [];
  }

  confirmDelete() {
      this.deleteProductDialog = false;
      this.products = this.products.filter(val => val.id !== this.product.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      this.product = {};
  }

  hideDialog(dialog:string) {
    switch (dialog) {
      case 'productDialog':
        this.productDialog = false;
        break;
        case 'AdventageDialog':
          this.AdventageDialog = false;
          break;
          case 'CaracteristicsDialog':
          this.CaracteristicsDialog = false;
          break;

      default:
        break;
    }
      this.submitted = false;
  }

  saveProduct(dialog:string) {
      this.submitted = true;

      if (this.product.name?.trim()) {
          if (this.product.id) {
              // @ts-ignore
              this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
              this.products[this.findIndexById(this.product.id)] = this.product;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Producto actulizado', life: 3000 });
          } else {
              this.product.id = this.createId();
              this.product.code = this.createId();
              this.product.image = 'product-placeholder.svg';
              // @ts-ignore
              if (this.product.inventoryStatus) {
                this.product.inventoryStatus = this.product.inventoryStatus
              }
              else{

                this.product.inventoryStatus.value= 'Disponibilidad';
              }
              this.products.push(this.product);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Productio creado', life: 3000 });
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
   async onUpload($event:FileUploadEvent) {
    const files:File[]=$event.files
await this.fileService.uploadFiles(files,'Producto');
    for(let file of $event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'Imagen subida exitosamente', detail: ''});
}
addOtherOne(field:string){
  switch (field) {
    case 'ProductSizes':
      this.ProductSizes.push(new sizes())
    break;
    case 'adventages':
      if (this.adventages.length!=5) {
        this.adventages.push("")
      }
    break;
    case 'disaventages':
      if(this.disaventages.length!=5)
    this.disaventages.push("")
    break;
  }
}
valorCercano(numero:number) {
  // Redondeamos el número al entero más cercano
  const enteroCercano = Math.round(numero);

  // Calculamos el número con un decimal de 0.5 más cercano
  const decimalCercano = Math.round(numero * 2) / 2;

  // Comparamos las dos opciones y devolvemos la más cercana al número original
  if (Math.abs(numero - enteroCercano) <= Math.abs(numero - decimalCercano)) {
    return enteroCercano;
  } else {
    return decimalCercano;
  }
}
updateSize(size: any, index: number) {
  // Realiza cualquier validación o ajustes necesarios aquí
  // Por ejemplo, llamar a la función valorCercano y actualizar el valor
  size.size = this.valorCercano(size.size);
  // Actualiza el arreglo ProductSizes si es necesario
  this.ProductSizes[index] = size;
}
}
