import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, ValidatorFn } from '@angular/forms';

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

}
