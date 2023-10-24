import { Component } from '@angular/core';
import { DataAddress } from 'src/app/interfaces/user.interfaces';
import {AccountService} from 'src/app/account/services/Account.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/validators/validator.service';
interface UserData{
  email: string
  names: string
  lastnames: string
  phone: number
}
interface User{
UserInfo:UserData
DataAddress:DataAddress
}
@Component({
  templateUrl: './user-datas-page.component.html',
  styleUrls: ['./user-datas-page.component.scss']
})
export class UserDatasPageComponent {
  constructor(private AccountService:AccountService,private FormBuilder:FormBuilder,private ValidatorService:ValidatorService){
    const user=this.AccountService.getUserFromCokkies()
    //const {}=user;

  }
  public UserDataForm:FormGroup=this.FormBuilder.group({
    names:new FormControl("Eder",[Validators.required,Validators.pattern(this.ValidatorService.firstNameAndLastnamePattern)]),
    lastnames:new FormControl("Godinez",[Validators.required,Validators.pattern(this.ValidatorService.firstNameAndLastnamePattern)]),
    phone:new FormControl(3921067869,Validators.required),
    email:new FormControl("eder.godinez26@gmail.com"),
    //Shipping DATA
    Street: new FormControl("Verdia",[Validators.required,Validators.pattern(this.ValidatorService.AddressPatter)]),
    number:new FormControl("337-A",[Validators.required]),
    postal_Code:new FormControl(47860,[Validators.required,Validators.minLength(5)]),
    Cologne: new FormControl("San Juan",[Validators.required,Validators.pattern(this.ValidatorService.AddressPatter)]),
    State: new FormControl("Jalisco",[Validators.required]),//
    City: new FormControl("Ocotlan",[Validators.required]),//
  })
  User:User={
    UserInfo:{
      email:"",
      names:"",
      lastnames:"",
      phone:0
    },
    DataAddress:{
      Street: "",
      number: "",
      postal_Code: 0,
      Cologne: "",
      State: "",
      City: ""
    }
  }
  UpdateUserData(){
    if (!this.UserDataForm.valid) {
      console.log("has errors")
      return
    }
    console.log("Info updated")

  }
}
