import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'PatternError'
})
export class PatternError implements PipeTransform {

  transform(value: string|null, type: string): string {
    if (!value) {
      return ''
    }
    else{
      if (value.includes('Formato')) {
        switch(type){
          case 'email':
            return 'Formato de correo es invalido'
          case 'names':
            return 'Formato de nombre invalido'
            case 'lastnames':
            return 'Formato de apellidos invalido'
          case 'password':
            return 'La contraseña no cumple con los estandares propuestos'
          default:
            return value
        }

      }
      else{
        return value
      }
    }
  }

}
