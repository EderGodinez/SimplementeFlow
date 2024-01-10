import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, Toast } from '../../interfaces';


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Output() mensajeEnviado = new EventEmitter<Toast>();
  @Input()
  Products:Product[]=[]

}
