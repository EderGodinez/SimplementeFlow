import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ProductOrder, checkoutList } from 'src/app/interfaces/checkout.interface';
import { Sizes } from '../../interfaces/product.interface';

@Component({
  selector: 'checkout-card',
  templateUrl: './checkout-card.component.html',
  styleUrls: ['./checkout-card.component.scss']
})
export class CheckoutCardComponent implements OnInit{
  ngOnInit():void{
   const a  = Object.entries(this.AllowSizes).filter(([size, value]) =>value>0 );
   this.AllowSizesObject=a
  }
AllowSizesObject:any[]=[]
@Output()
deleteProduct:EventEmitter<{id:string,size:number}>=new EventEmitter();
@Output()
MoreLestProduct:EventEmitter<{id:string,quantity:number,size:number}>=new EventEmitter()
@Input()
AllowSizes:Sizes={}
@Input()
productCheckout:ProductOrder={
_id:'',
patent:'',
productName: '', // Descripción del producto
productDescription:'',
Image: '',
Size:0,
Amount: 0,
Price: 0,
}
IncreaseProduct(id:string){
  this.productCheckout.Amount=this.productCheckout.Amount+1
  this.MoreLestProduct.emit({id,quantity:1,size:this.productCheckout.Size})
}
Descreaseproduct(id:string){
  this.productCheckout.Amount=this.productCheckout.Amount-1
this.MoreLestProduct.emit({id,quantity:-1,size:this.productCheckout.Size})
}
CompareSizes(size:string,Size:number){
  return parseInt(size)===Size
}
}
