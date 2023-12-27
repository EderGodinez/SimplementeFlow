import { Component, OnInit } from '@angular/core';
import { DataAddress, User } from 'src/app/interfaces/user.interfaces';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/validators/validator.service';
import { AuthService } from '../../services/Account.service';
@Component({
  templateUrl: './user-datas-page.component.html',
  styleUrls: ['./user-datas-page.component.scss']
})
export class UserDatasPageComponent implements OnInit{
  //Propiedades de componente
  User!:User
  //Dependecy injection
  constructor(private AccountService:AuthService,private FormBuilder:FormBuilder,private ValidatorService:ValidatorService){
  }
  ngOnInit(): void {
    if(this.AccountService._User){
      this.User=this.AccountService._User
      this.initializeForm(this.User)
    }



  }
  public UserDataForm:FormGroup=this.FormBuilder.group({})

  UpdateUserData(){
    if (!this.UserDataForm.valid) {
      console.log("has errors")
      return
    }
    console.log("Info updated")
  }
  initializeForm(User:User): void {
    const {names,lastnames,phone,email,data_Address}=User
    const {Street,number,postal_Code,City,Cologne,State}=data_Address
    this.UserDataForm = this.FormBuilder.group({
    names:new FormControl(names,[Validators.required,Validators.pattern(this.ValidatorService.firstNameAndLastnamePattern)]),
    lastnames:new FormControl(lastnames,[Validators.required,Validators.pattern(this.ValidatorService.firstNameAndLastnamePattern)]),
    phone:new FormControl(phone,Validators.required),
    email:new FormControl(email),
    //Shipping DATA
    Street: new FormControl(Street,[Validators.required,Validators.pattern(this.ValidatorService.AddressPatter)]),
    number:new FormControl(number,[Validators.required]),
    postal_Code:new FormControl(postal_Code,[Validators.required,Validators.minLength(5)]),
    Cologne: new FormControl(Cologne,[Validators.required,Validators.pattern(this.ValidatorService.AddressPatter)]),
    State: new FormControl(State,[Validators.required]),//
    City: new FormControl(City,[Validators.required]),//
    });
  }
}
