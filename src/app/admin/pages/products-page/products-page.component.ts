import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FileUploadEvent } from 'primeng/fileupload';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { FileService } from '../../services/file.service';
import { AdminProductService } from '../../services/Adminproduct.service';
import { Product, Sizes } from '../../../products/interfaces/product.interface';
import { ProductValidatorService } from '../../services/validator.service';
@Component({
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
  providers:[MessageService]
})

export class ProductsPageComponent {
  constructor( private messageService: MessageService,private fileService:FileService,private FB:FormBuilder,private productService:AdminProductService,private Validator:ProductValidatorService) {
    const array=this.ProductInfoForm.get('Sizes') as FormArray
    console.log(array.length)
  }
  productDialog: boolean = false;
  AdventageDialog:boolean=false
  deleteProductDialog: boolean = false;
  CaracteristicsDialog:boolean=false
  deleteProductsDialog: boolean = false;
  products: Product[] = [];
  product: Product = {
    _id: {$oid:""},
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
    adventages: [""],
    disadventages: [""],
    Discount:0,
    inventoryStatus:"",
    __v: 0
  };

  selectedProducts: any[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];
  EditProduct:boolean=false;
  rowsPerPageOptions = [5, 10, 20];
  uploadedFiles: any[] = [];
  // Crea un FormGroup para cada par de tamaño y cantidad
  sizeArray: { key: number; value: number }[] = Object.entries(this.product.sizes).map(([key, value]) => ({
    key: Number(key),
    value: value,
  }));

  // Ahora puedes usar 'map' en el array sizeArray
  sizeQuantityControls = this.sizeArray.map(item => {
    return this.FB.group({
      size: [item.key, Validators.required],
      quantity: [item.value, Validators.required]
    });
  });
  public ProductInfoForm:FormGroup=this.FB.group({
    ProductName:[this.product.ProductName,[Validators.required]],
    ProductDescription:[this.product.description,[Validators.required]],
    ProductStatus:[this.product.inventoryStatus,[Validators.required]],
    ProductPrice:[this.product.price,[Validators.required]],
    ProductDiscount:[this.product.Discount,[Validators.required,Validators.min(0),Validators.max(100)]],
    Sizes:this.FB.array(this.sizeQuantityControls,[Validators.required,Validators.minLength(1),Validators.maxLength(5)])
  })
  public AdventagesForm:FormGroup= this.FB.group({
    Adventages: this.FB.array([this.createAdvantageControl()], [Validators.required]),
    Disaventages: this.FB.array([this.createAdvantageControl()], [Validators.required])
  }, { validators: [this.Validator.atLeastOneValidInArrays] })
  public CaracteristicsForm:FormGroup=this.FB.group({
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
  })
  //Main
  public ProductMainForm:FormGroup=this.FB.group({
    ProductInfoForm:[this.ProductInfoForm,[Validators.required]],
    AdventagesForm: [this.AdventagesForm,[Validators.required]],
    CaracteristicsForm:[this.CaracteristicsForm,[Validators.required]]
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
  createSizeFormGroup(sizeValue: string, quantityValue: number): FormGroup {
    return this.FB.group({
      size: [sizeValue, Validators.required],
      quantity: [quantityValue, Validators.required],
    });
  }

  addSize() {
    const sizesArray = this.ProductInfoForm.get('Sizes') as FormArray;
    if (sizesArray.length<20) {
      sizesArray.push(this.createSizeFormGroup('', 0)); // Puedes proporcionar valores iniciales
    }
    else{
      this.messageService.add({key:'sizes' ,severity: 'error', summary: 'Limite de tallas', detail: 'Limite de tallas alcanzado' })
    }
  }

  createAdvantageControl(): FormControl {
    return this.FB.control('', Validators.required);
  }
  openNew() {
    this.ResetProduct()
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(product: Product) {
      this.product = { ...product };
      this.productDialog = true;
  }

  deleteProduct(product: Product) {
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
      this.products = this.products.filter(val => val._id?.$oid !== this.product._id?.$oid);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      this.ResetProduct()
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
            if (this.ProductMainForm.get('CaracteristicsForm')!.valid) {
              this.CaracteristicsDialog = false;
              return
            }
            this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'El formulario de ventajas debe de contener una de cada campo', life: 2000 });
          break;

      default:
        break;
    }
      this.submitted = false;
  }

  saveProduct(dialog:string) {
      this.submitted = true;

      if (this.product.ProductName?.trim()) {
          if (this.product._id?.$oid) {
              // @ts-ignore
              this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
              this.products[this.findIndexById(this.product._id.$oid)] = this.product;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Producto actulizado', life: 3000 });
          } else {
              this.product._id!.$oid = this.createId();
              this.product.images[0] = 'product-placeholder.svg';
              // @ts-ignore
              if (this.product.inventoryStatus) {
                this.product.inventoryStatus = this.product.inventoryStatus
              }
              else{

                this.product.inventoryStatus= 'Disponibilidad';
              }
              this.products.push(this.product);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Productio creado', life: 3000 });
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.ResetProduct()//Limpiamos los campos de producto
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i]._id?.$oid === id) {
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
      console.log('se agrega size')
      this.addSize()
    break;
    case 'adventages':
      if (this.product.adventages.length<5) {
        this.product.adventages.push("")
      }
    break;
    case 'disaventages':
      if(this.product.disadventages.length!=5)
    this.product.disadventages.push("")
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

ResetProduct(){
  this.product = {
    _id: {$oid:""},
    ProductName: "",
    description: "",
    price: 0,
    sizes: [],
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
    __v: 0
  };
}
get sizes(){
return this.ProductInfoForm.get('Sizes') as FormArray;
}
isvalidFieldInArray(formArray:FormArray,index:number){
  return formArray.controls[index].errors &&
    formArray.controls[index].touched;
}

}
