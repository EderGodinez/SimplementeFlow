import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'PatternError',
  standalone:true
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
          case 'street':
            return 'El nombre de la calle no es valida'
          case 'cologne':
            return 'El nombre de colonia invalido'
          case 'number':
              return 'Numero de domicilio es invalido'
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
