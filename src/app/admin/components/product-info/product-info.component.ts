import { Component, ElementRef, Input, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/products/interfaces';
import { FilesService } from '../../services/file.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ProductValidatorService } from '../../services/validator.service';
interface SaveProduct{
  closeDialog:boolean
  product:Product
}
interface Sizes{
  size:number
  quantity:number
}
@Component({
  selector: 'productinfoComponent',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
  providers:[MessageService]
})
export class ProductInfoComponent implements OnInit {
  constructor(private FB:FormBuilder,private FileService:FilesService,private messageService: MessageService,private ValidatorService:ProductValidatorService){
  }

  ngOnInit(): void {
    this.statuses = [
      { label: 'Disponible', value: 'Disponible' },
      { label: 'Pocas existencias', value: 'Pocas existencias' },
      { label: 'Sin stock', value: 'Sin stock' }
    ];
    this.ProductInfoForm=this.FB.group({
      ProductName:[this.product.ProductName,[Validators.required,Validators.minLength(10)]],
      description:[this.product.description,[Validators.required,Validators.minLength(20)]],
      inventoryStatus:[this.product.inventoryStatus,[Validators.required]],
      images:this.FB.array(this.ParseArrayToArrayControls(this.product.images)),
      price:[this.product.price,[Validators.required,Validators.min(500),Validators.max(100000)]],
      Discount:[this.product.Discount,[Validators.required,Validators.min(0),Validators.max(100)]],
      sizes:this.InitSizes(this.product.sizes)
    })
    this.CaracteristicsForm=this.FB.group({
      patent:[this.product.General.patent,[Validators.required]],
      model:[this.product.General.model,[Validators.required]],
      Category:[this.product.General.Category,[Validators.required]],
      age:[this.product.General.age,[Validators.required]],
      width_type:[this.product.General.width_type,[Validators.required]],
      fit_type:[this.product.General.fit_type,[Validators.required]],
      class_shoes:[this.product.General.class_shoes,[Validators.required]],
      E_Material:[this.product.General.E_Material,[Validators.required]],
      I_Material:[this.product.General.I_Material,[Validators.required]],
      Shoe_sole:[this.product.General.Shoe_sole,[Validators.required]],})
      this.AdventagesForm= this.FB.group({
        Adventages:this.FB.array(this.ParseArrayToArrayControls(this.product.adventages)) ,//this.FB.array(this.ParseArrayToArrayControls(this.product.adventages))
        Disaventages: this.FB.array(this.ParseArrayToArrayControls(this.product.disadventages)),
      })
      this.ProductInfoForm.get('inventoryStatus')?.disable()
      if (!this.EditProduct) {
        this.ProductInfoForm.disable()
      }
    }
  @Input()
  product:Product = {
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
  }
  @Input()
  productDialog:boolean=false
  @Input()
  EditProduct:boolean=false;
  @Output()
  SaveProduct:EventEmitter<SaveProduct>=new EventEmitter<SaveProduct>()
  @Output()
  CancelRegister:EventEmitter<boolean>=new EventEmitter<boolean>();
  @ViewChild('sizeInput') sizeInput!: ElementRef;
  @ViewChild('quantityInput') quantityInput!: ElementRef;
  get images(){
    return this.ProductInfoForm.get('images') as FormArray
  }
  get Sizes(){
    return this.ProductInfoForm.get('sizes') as FormArray
  }
  public apiURL=environment.APIBaseUrl;
  CaracteristicsDialog:boolean=false
  AdventageDialog:boolean=false
  statuses:any[]=[]
  InitSizes(sizes:Object):FormArray{
  // Crea un FormGroup para cada par de tamaño y cantidad
  const sizeArray: { key: number; value: number }[] = Object.entries(sizes).map(([key, value]) => ({
  key: Number(key),
  value: value,
}));
// Ahora puedes usar 'map' en el array sizeArray
  const sizeQuantityControls:FormGroup[] = sizeArray.map(item => {
    return this.FB.group({
    size: [item.key, Validators.required],
    quantity: [item.value, Validators.required],
    reload:[0]
  });

});
 // Utiliza el método 'array' de FormBuilder para crear la FormArray
 return this.FB.array(sizeQuantityControls,[Validators.required,Validators.minLength(1),Validators.maxLength(5)]);
  }
  //Info
  public ProductInfoForm!:FormGroup;
  //General
  public CaracteristicsForm!:FormGroup;
  //Adventages and Disadventages
  public AdventagesForm!:FormGroup;
  IsValidField(MyForm:FormGroup,field:string){
    return this.ValidatorService.isValidField(MyForm,field)
  }
  IsValidFieldInArray(FormArray:FormArray,index:number){
    return this.ValidatorService.isvalidFieldInArray(FormArray,index)
  }
  GetErrorMessage(MyForm:FormGroup,field:string){
    return this.ValidatorService.getFieldError(MyForm,field)
  }
  createAdvantageControl(value:string): FormControl {
     const NewControl= this.FB.control(value,[Validators.required]);//todo:Aqui de da error el valor marca null
     return NewControl
  }
  //Los form controls unicamnete con validators de campo obligatorio
  ParseArrayToArrayControls(array:any[]):FormControl[]{
    let arrayControls:FormControl[]=[];
    array.forEach(field=>{
      const control=this.createAdvantageControl(field)
      arrayControls.push(control)
    })
    return arrayControls;
  }
  searchKey(key:number):boolean{
    const sizesQuantity=[...this.ProductInfoForm.get('sizes')?.value]
    const exist=sizesQuantity.find(size=>size.size===key)
    return exist?true:false
  }
  addOtherSize(){
        const sizeValue: number = parseFloat(this.sizeInput.nativeElement.value);
        const quantityValue: number =parseInt(this.quantityInput.nativeElement.value)
        const isValid:boolean=sizeValue>0&&quantityValue>0
        const keyExist=this.searchKey(sizeValue);
        if (isValid&&!keyExist) {
          this.addSize(sizeValue,quantityValue)
          //Resetar inputs de registro de tallas
          this.quantityInput.nativeElement.value="";
          this.sizeInput.nativeElement.value="";
        }
        else{
          if(!isValid){
            this.messageService.add({life:3000,severity:'error',summary:"Valores invalidos",detail:"Los valores deberan numeros mayor a 0"})
          }
          else{
            this.messageService.add({life:3000,severity:'error',summary:"Talla existente",detail:"favor de agregar o eliminar en tabla existente"})
          }
          this.quantityInput.nativeElement.value="";
          this.sizeInput.nativeElement.value="";
    }
  }
  createSizeFormGroup(sizeValue: number, quantityValue: number): FormGroup {
    return this.FB.group({
      size: [sizeValue, Validators.required],
      quantity: [quantityValue, Validators.required],
    });
  }

  addSize(size:number,stock:number) {
    const sizesArray = this.Sizes
    if (sizesArray!.length<20) {
      sizesArray!.push(this.createSizeFormGroup(size,stock)); // Puedes proporcionar valores iniciales
    }
    else{
      this.messageService.add({key:'sizes' ,severity: 'error', summary: 'Limite de tallas', detail: 'Limite de tallas alcanzado' })
    }
  }
  DeleteSize(size:number){
    let sizesArray = this.Sizes
    let index = sizesArray.controls.findIndex(control => control.value.size === size);
    sizesArray.removeAt(index)
  }
  //Surtir productos
  supplyStock(size:number,quantity:number){
    if (quantity&&quantity>0) {
      const sizesQuantity=[...this.ProductInfoForm.get('sizes')?.value]
      sizesQuantity.map(Size=>{
        if (Size.size===size) {
          Size.quantity+=quantity
          Size.reload=0
        }
      })
      this.messageService.add({life:4000,closable:false,severity:'success', summary:'Productos añadidos',detail:`El stock de talla ${size} se ah actulizado exitosamente`})
    }
    else{
      this.messageService.add({life:4000,closable:false,severity:'warn', summary:'Espacio vacio',detail:'El espacio de stock esta vacio'})
    }
  }
  changeValue(event:any,size:number){
    const sizesQuantity=[...this.ProductInfoForm.get('sizes')?.value]
    sizesQuantity.map(T=>{
      if (T.size===size) {
        T.reload=parseInt(event.value,10);
      }
    })
  }
  isvalidFieldInArray(formArray:FormArray,index:number){
    return formArray.controls[index].errors &&
      formArray.controls[index].touched;
  }

  DeleteImage(file:string){
    let images=this.images
   this.FileService.DeleteFile(file).subscribe(
    resp=>{
      if (resp.message.includes('eliminada')) {
        //Filtar imagenes y eliminar el nombre de imagen del formarray
        //1.-Buscamos el index de la imagen a eliminar
        const index = images.controls.findIndex(control => control.value === file);
        //2.-Si el elemnto se encuentra se elimina
        if (index !== -1)
        images.removeAt(index);
        this.messageService.add({severity:'success',detail:resp.message,life:4000,summary:'Imagen eliminada con exito'})
      }
      else{
        this.messageService.add({severity:'warn',detail:resp.message,life:4000,summary:'Imagen no exite'})
      }

    }).unsubscribe
  }
  onUpload(event: any) {
    const images=this.images
    const response:string=event.originalEvent.body.split(' ').slice(1,-2).join('')
    const filesid:string[]=response.split(',')
    filesid.forEach(id => {
      images.push(this.FB.control(id))
      });
    this.messageService.add({ severity: 'success', summary: 'Archivo subido', detail: `Archivo guardado con exito con id ${filesid.join(',')}`});
  }
  CloseDialog(value:boolean,dialog:string){
  switch(dialog){
    case 'AdventageDialog':
      this.AdventageDialog=value;
      break;
    case 'CaracteristicsDialog':
      this.CaracteristicsDialog=value
      break;
  }
  }
  CalculateStatus(stock:any[]):string{
    let totalStock:number=0;
    stock.forEach(productSize => {
      totalStock+=productSize
    });
    if(totalStock>=80){
      return 'Disponible'
    }
    else if(totalStock<80&&totalStock>=1){
      return 'Pocas existencias'
    }
    else
    return 'Sin Stock'
  }
  //Convierte mi mi formulario de tallas en un map
ConvertToMap(sizes:Sizes[]):Map<number,number>{
let SizeMap:Map<number,number>=new Map()
  sizes.forEach(Productsize=>{
    // Asumo que cada 'item' tiene propiedades 'size' y 'quantity'
    const { size, quantity } = Productsize;
    // Agregar al Map
    SizeMap.set(size, quantity);
})
  return SizeMap
}
  SubmitProduct(){
    if(this.EditProduct){
    this.ProductInfoForm.get('inventoryStatus')?.enable()
    const {ProductName,description,images,price,Discount,sizes}=this.ProductInfoForm.value
    const {Adventages,Disaventages}=this.AdventagesForm.value
    const {patent,model,Category,age,width_type,fit_type,class_shoes,E_Material,I_Material,Shoe_sole}=this.CaracteristicsForm.value
    const sizesMap = new Map(sizes.map((item: { size: number, quantity: number }) => [item.size, item.quantity]));
    const sizesObject: { [key: number]: number } = {};
    sizes.forEach((item:{size: number, quantity: number}) => {
    sizesObject[item.size] = item.quantity;
    });
    const SubmitProduct:Product={
    _id: this.product._id?this.product._id:'',
    ProductName:ProductName,
    description: description,
    price: price,
    sizes: sizesObject,
    images: images,
    General: {
    patent: patent,
    model: model,
    Category: Category,
    age: age,
    width_type:width_type,
    fit_type: fit_type,
    class_shoes: class_shoes,
    E_Material: E_Material,
    I_Material: I_Material,
    Shoe_sole: Shoe_sole
    },
    adventages: Adventages,
    disadventages: Disaventages,
    Discount:Discount,
    inventoryStatus:this.CalculateStatus([...sizesMap.values()]),
    RegisterDate:this.product._id?this.product.RegisterDate:new Date(),
    __v: 0
    }
    this.SaveProduct.emit({
      closeDialog:false,
      product:SubmitProduct    })
    }
    else
    this.CancelRegister.emit(false)
  }
}
