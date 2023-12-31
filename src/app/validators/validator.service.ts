
import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  public  firstNameAndLastnamePattern: string = '([a-zA-Z]+)(?: ([a-zA-Z]+))?';
  public  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public  AddressPatter:string='([a-zA-Z0-9]+)(?: ([a-zA-Z0-9]+))?(?: ([a-zA-Z0-9]+))?';
  public passPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/;
  public AreFieldsEquals(pass:string,confirm:string){
    return(Form:AbstractControl): ValidationErrors| null=>{
      const field1value=Form.get(pass)?.value
      const field2value=Form.get(confirm)?.value
      if (field1value!==field2value) {
        Form.get(confirm)?.setErrors({FieldsDiferents:true})
        return {
          FieldsDiferents:true
        }
      }
      Form.get(confirm)?.setErrors(null)
      return null
    }
  }
  public FieldsDiferents(field1:string,field2:string){
    return(Form:AbstractControl): ValidationErrors| null=>{
      const field1value=Form.get(field1)?.value
      const field2value=Form.get(field2)?.value
      if (field1value===field2value) {
        Form.get(field2)?.setErrors({FieldsEquals:true})
        return {
          FieldsEquals:true
        }
      }
      Form.get(field2)?.setErrors(null)
      return null
    }
  }
  public passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('NewPassword')?.value;
    const confirmNewPassword = control.get('ConfirmNewPassword')?.value;
    if (newPassword !== confirmNewPassword) {
      return { passwordsNotMatch: true };
    }
    return null;
  }
  HasUpper(cadena:string):boolean {
    for (var i = 0; i < cadena.length; i++) {
      if (cadena[i] >= 'A' && cadena[i] <= 'Z') {
        return true;
      }
    }
    return false;
  }
  HasNumber(cadena:string):boolean {
  const numbers:string[]=["1","2","3","4","5","6","7","8","9","0"]
  for (const number of numbers) {
    if(cadena.includes(number)){
      return true
    }
  }
  return false
  }
  HasLower(cadena:string):boolean {
    for (var i = 0; i < cadena.length; i++) {
      if (cadena[i] >= 'a' && cadena[i] <= 'z') {
        return true;
      }
    }
    return false;
  }
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
          return `Campo requere mínimo ${ errors['minlength'].actualLength }/${ errors['minlength'].requiredLength } caracters.`;
        case 'maxlength':
          return `Máximo ${errors['maxlength'].actualLength}/${errors['maxlength'].requiredLength} caracteres.`;
        case 'min':
              return `La cantidad debe der de minimo ${ errors['min'].min } .`;
        case 'max':
              return `La cantidad maxima no debe sobrepasar ${ errors['max'].max }.`;
        case 'pattern':
                return `Formato de campo invalido.`;
      }
    }
    return null;
  }
  isvalidFieldInArray(formArray:FormArray,index:number){
    return formArray.controls[index].errors &&
      formArray.controls[index].touched;
  }

}
