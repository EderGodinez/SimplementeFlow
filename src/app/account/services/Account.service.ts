import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginResponse } from 'src/app/admin/interfaces/loginResponse.interface';
import { RegisterDto } from '../interfaces/Register.interface';
import { RegisterResponse } from '../interfaces/RegisterResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
constructor(private Http:HttpClient) { }
isValidRegister:boolean=false
User:User={
_id:{$oid:""},
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
Register(UserInfo:RegisterDto):Observable<RegisterResponse>{
  console.log(UserInfo)
return this.Http.post<RegisterResponse>(`${environment.APIBaseUrl}/users/register`,UserInfo)
}
SignIn(email:string,password:string):Observable<LoginResponse>{
  const body={email,password}
return this.Http.post<LoginResponse>(`${environment.APIBaseUrl}/users/login`,body)
}
logOut(){
localStorage.removeItem('Token')
}
getUserById(id:string):Observable<User>{
  return this.Http.get<User>(`${environment.APIBaseUrl}/users/${id}`)
  }
}
