import { Component, Input, Output, EventEmitter } from '@angular/core';
import { checkoutList } from 'src/app/pages/checkout-page/checkout.interface';

@Component({
  selector: 'checkout-card',
  templateUrl: './checkout-card.component.html',
  styleUrls: ['./checkout-card.component.scss']
})
export class CheckoutCardComponent {
@Output()
deleteProduct:EventEmitter<string>=new EventEmitter();
@Input()
productCheckout:checkoutList={
age:'',
patent:'',
productName: '', // Descripción del producto
productDescription:'',
Image: '',
Size:0,
Amount: 0,
Price: 0
}
}
