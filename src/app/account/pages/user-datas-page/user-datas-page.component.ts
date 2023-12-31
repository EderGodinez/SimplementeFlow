import { Component, OnInit } from '@angular/core';
import { DataAddress, User } from 'src/app/interfaces/user.interfaces';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/validators/validator.service';
import { AuthService } from '../../services/Account.service';
import { catchError, of, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
@Component({
  templateUrl: './user-datas-page.component.html',
  styleUrls: ['./user-datas-page.component.scss'],
  providers:[MessageService]
})
export class UserDatasPageComponent implements OnInit{
  //Propiedades de componente
  User!:User
  //Dependecy injection
  constructor(private AccountService:AuthService,private FormBuilder:FormBuilder,private ValidatorService:ValidatorService,private Message:MessageService){

  }
  ngOnInit(): void {
    this.User=this.AccountService.User
    this.initializeForm(this.User)
  }
  public UserDataForm:FormGroup=this.FormBuilder.group({})

  UpdateUserData(){
    if (this.UserDataForm.valid) {
      const phoneString=this.UserDataForm.get('phone')?.value.toString()
      this.UserDataForm.get('phone')?.setValue(parseInt(phoneString.split('-').join('')))
      this.AccountService.UpdateInfo(this.UserDataForm.value).pipe(
        tap((response)=>{
          this.AccountService.setUser(response)
          this.Message.add({life:3000,summary:'Informacion actualizada con exito',severity:'info'})
        }),
        catchError((error)=>{
          this.Message.add({life:3000,summary:'Error al actualizar informacion',severity:'error',detail:error.error.message})
          return of({})
        })
      ).subscribe()
    }
  }
  initializeForm(User:User): void {
    const {names,lastnames,phone,email,data_Address}=User
    const {Street,number,postal_Code,City,Cologne,State}=data_Address
    this.UserDataForm = this.FormBuilder.group({
    names:new FormControl(names,[Validators.required,Validators.pattern(this.ValidatorService.firstNameAndLastnamePattern)]),
    lastnames:new FormControl(lastnames,[Validators.required,Validators.pattern(this.ValidatorService.firstNameAndLastnamePattern)]),
    phone:new FormControl(phone,Validators.required),
    email:new FormControl(email),
    data_Address:this.FormBuilder.group({
      Street: new FormControl(Street,[Validators.required,Validators.pattern(this.ValidatorService.AddressPatter)]),
      number:new FormControl(number,[Validators.required,Validators.pattern(this.ValidatorService.NumberAddress)]),
      postal_Code:new FormControl(postal_Code,[Validators.required,Validators.minLength(5),Validators.maxLength(5)]),
      Cologne: new FormControl(Cologne,[Validators.required,Validators.pattern(this.ValidatorService.AddressPatter)]),
      State: new FormControl(State,[Validators.required]),//
      City: new FormControl(City,[Validators.required]),//
    })

    });
  }
  IsInvalidField(field:string,FormGroup:FormGroup){
    return this.ValidatorService.isValidField(FormGroup,field)
  }
  GetMessageError(field:string,FormGroup:FormGroup){
    return this.ValidatorService.getFieldError(FormGroup,field)
  }
  get DataAddressForm():FormGroup{
    return this.UserDataForm.get('data_Address') as FormGroup
  }
}
