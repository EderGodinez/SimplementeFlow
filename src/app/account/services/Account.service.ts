import { GuardsService } from './../../admin/services/Guards.service';
import { AddShoppingCarResponse } from './../interfaces/addShoppingCar.interface';
import { Injectable } from '@angular/core';
import { ShoppingCar, User } from 'src/app/interfaces/user.interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginResponse } from 'src/app/admin/interfaces/loginResponse.interface';
import { RegisterDto } from '../interfaces/Register.interface';
import { RegisterResponse } from '../interfaces/RegisterResponse.interface';
import { AddlikeResponse } from '../interfaces/Addlike.Response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  IsLog:boolean=false
constructor(private Http:HttpClient,private GuardsService:GuardsService) {
  this.GuardsService.checkAuthStatus().subscribe({
    next:(response)=> {
    const {User}=response
    this.setUser(User)      
    },
    error:(err)=> {
      this.logOut()
    },
  })
 }
isValidRegister:boolean=false
User:User={
_id:"",
email:'',
birthdate:new Date(),
gender:'Hombre',
isActive:true,
names:"",
lastnames:"",
likes:[],
phone:0,
RegisterDate:new Date(),
shopping_car:[],
UserRole:'User',
__v:0,
data_Address:{
  City:"",
  Cologne:"",
  number:"",
  postal_Code:0,
  State:"",
  Street:""
}
}
setUser(User:User){
  this.User=User
}
get _User():User{
  return this.User
}
getUserAutorizationHeaders(){
  const token = localStorage.getItem('Token');
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${ token }`);
    return headers
}
Register(UserInfo:RegisterDto):Observable<RegisterResponse>{
return this.Http.post<RegisterResponse>(`${environment.APIBaseUrl}/users/register`,UserInfo)
}
UpdateInfo(UserInfo:User):Observable<User>{
  const url:string=`${environment.APIBaseUrl}/users/${this.User._id}`
  const headers=this.getUserAutorizationHeaders()
  return this.Http.patch<User>(url,UserInfo,{headers})
}
SignIn(email:string,password:string):Observable<LoginResponse>{
  const body={email,password}
return this.Http.post<LoginResponse>(`${environment.APIBaseUrl}/users/login`,body)
}
logOut(){
localStorage.removeItem('Token')
this.IsLog=false
this.ResetUser()
}
ChangePass(_password:string,newPassword:string):Observable<User>{
  const email=this._User.email
  const body={email,_password,newPassword}
  const headers=this.getUserAutorizationHeaders()
  const url:string=`${environment.APIBaseUrl}/users/ChangePass`
  return this.Http.patch<User>(url,body,{headers})
}
getUserById(id:string):Observable<User>{
  return this.Http.get<User>(`${environment.APIBaseUrl}/users/${id}`)
  }
  ResetUser():void{
    this.setUser(
      {
        _id:"",
        email:'',
        birthdate:new Date(),
        gender:'',
        isActive:true,
        names:"",
        lastnames:"",
        likes:[],
        phone:0,
        RegisterDate:new Date(),
        shopping_car:[],
        UserRole:'',
        __v:0,
        data_Address:{
          City:"",
          Cologne:"",
          number:"",
          postal_Code:0,
          State:"",
          Street:""
        }
    })
  }
  AddLike(productId:string):Observable<AddlikeResponse>{
    const UserID=this._User._id
    const body={productId,UserID}
    const headers=this.getUserAutorizationHeaders()
    return this.Http.post<AddlikeResponse>(`${environment.APIBaseUrl}/users/AddLikes`,body,{headers})
  }
  AddShoppingCar(CarInfo:ShoppingCar) :Observable<AddShoppingCarResponse>{
    const UserID=this._User._id
    const{ProductId,quantity,size}=CarInfo
    const body={UserID,ProductId,quantity,size}
    const headers=this.getUserAutorizationHeaders()
     return this.Http.post<AddShoppingCarResponse>(`${environment.APIBaseUrl}/users/AddProduct`,body,{headers})
  }
}
