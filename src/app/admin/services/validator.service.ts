import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ProductValidatorService {
  constructor() { }

   atLeastOneValidInArrays(array1: FormArray, array2: FormArray): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const validControlsArray1 = array1.controls.filter((control) => control.valid);
      const validControlsArray2 = array2.controls.filter((control) => control.valid);

      return validControlsArray1.length > 0 || validControlsArray2.length > 0 ? null : { atLeastOneValid: true };
    };
  }
  isValidField( MyForm:FormGroup,field: string ): boolean | null {
    return MyForm.controls[field].errors
      && MyForm.controls[field].touched;
  }

  getFieldError( MyForm:FormGroup,field: string ): string | null {

    if ( !MyForm.controls[field] ) return null;

    const errors = MyForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
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
