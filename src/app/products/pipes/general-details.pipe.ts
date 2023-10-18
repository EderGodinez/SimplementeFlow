import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generalDetails'
})
export class GeneralDetailsPipe implements PipeTransform {
  transform(value: unknown) {
    let valueString=new String(value)
    valueString=valueString.charAt(0).toLocaleUpperCase()+valueString.slice(1)
  switch(value){
    case 'width_type':
    return 'Width type'
    case 'fit_type':
    return 'Fit type'
    case 'class_shoes':
    return 'Class shoes'
    case 'I_Material':
    return 'Internal material'
    case 'E_Material':
    return 'External material'
    case 'Shoe_sole':
    return 'Shoe sole'
    default:
    return valueString
  }
  }

}
