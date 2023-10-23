import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {


  constructor(private http: HttpClient) { }

  public  firstNameAndLastnamePattern: string = '([a-zA-Z]+)(?: ([a-zA-Z]+))?';
  public  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public  AddressPatter:string="([a-zA-Z0-9]+)(?: ([a-zA-Z0-9]+))?(?: ([a-zA-Z0-9]+))?";
  public passPattern:string='([a-zA-Z]+)(?: ([a-zA-Z]+))?'

 public validarCodigoPostal(Control: FormControl):ValidationErrors|null {
    return null
  }
  public StateExists = (control: FormControl):ValidationErrors|null=> {
    return null
    // Usa el servicio MiServicio aquí para realizar validaciones personalizadas
  }

  public CityExists = (control: FormControl):ValidationErrors|null=> {
    return null
    // Usa el servicio MiServicio aquí para realizar validaciones personalizadas
  }
  public AreFieldsEquals=(pass:string,confirm:string)=>{
    return(Form:AbstractControl): ValidationErrors| null=>{
      const field1value=Form.get(pass)?.value
      const field2value=Form.get(confirm)?.value
      console.log(`${field1value} y ${field2value} EQUALS`)
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
  public FieldsDiferents=(field1:string,field2:string)=>{
    return(Form:AbstractControl): ValidationErrors| null=>{
      const field1value=Form.get(field1)?.value
      const field2value=Form.get(field2)?.value
      console.log(`${field1value} y ${field2value}`)
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
}
