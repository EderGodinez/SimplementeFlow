import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'delivery'
})
export class DeliveryPipe implements PipeTransform {

  transform(value:string): string {
    switch (value) {
      case 'pending':
       return 'Pendiente'
      case 'shipped':
        return 'Entregado'
      case 'cancel':
        return 'Cancelado'
      default:
        return value;
    }
  }

}
