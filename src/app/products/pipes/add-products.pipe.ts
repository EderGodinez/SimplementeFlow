import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addProducts'
})
export class AddProductsPipe implements PipeTransform {

  transform(value: string): string {
    const quantity:number=parseInt(value.slice(0,2))
    const productname=value.split(' ')
    productname[1]=productname[1]+"'s"
    return value=quantity>1?productname.join(' '):value
  }

}
