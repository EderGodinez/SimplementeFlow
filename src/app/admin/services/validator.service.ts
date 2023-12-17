import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ProductValidatorService {
  constructor() { }

  atLeastOne(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control instanceof FormArray) {
        const arrayLength = control.length;
        if (arrayLength === 0) {
          return { atLeastOne: true };
        }else{
          const controlsValid=control.controls.filter((field=>field.valid))
          return controlsValid.length>0?null:{ atLeastOne: true }
        }
      }
      return null;
    };
  }
  isValidField( MyForm:FormGroup,field: string ): boolean | null {
    return MyForm.controls[field].errors
      && MyForm.controls[field].touched;
  }

  getFieldError( MyForm:FormGroup,field: string): string | null {
    if ( !MyForm.controls[field] ) return null;
    const errors = MyForm.controls[field].errors || {};
    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${ errors['minlength'].actualLength }/${ errors['minlength'].requiredLength } caracters.`;
        case 'maxlength':
            return `Maximo ${ errors['maxlength'].maxLength } es de caracters.`;
        case 'min':
              return `La cantidad debe der de minimo ${ errors['min'].min } .`;
        case 'max':
              return `La cantidad maxima no debe sobrepasar ${ errors['max'].max }.`;
      }
    }
    return null;
  }
  isvalidFieldInArray(formArray:FormArray,index:number){
    return formArray.controls[index].errors &&
      formArray.controls[index].touched;
  }

}
