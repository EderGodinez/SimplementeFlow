import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generalDetails'
})
export class GeneralDetailsPipe implements PipeTransform {
  transform(value: unknown) {
    let valueString=new String(value)
    valueString=valueString.charAt(0).toLocaleUpperCase()+valueString.slice(1)
  switch(value){
    case 'Category':
    return 'Categoria'
    case 'age':
    return 'Publico dirigido'
    case 'model':
    return 'Modelo'
    case 'patent':
     return 'Marca'
    case 'width_type':
    return 'Tipo de ancho'
    case 'fit_type':
    return 'Tipo de ajuste'
    case 'class_shoes':
    return 'Clase de zapato'
    case 'I_Material':
    return 'Material interno'
    case 'E_Material':
    return 'Material exterior'
    case 'Shoe_sole':
    return 'Suela de zapato'
    default:
    return valueString
  }
  }

}
