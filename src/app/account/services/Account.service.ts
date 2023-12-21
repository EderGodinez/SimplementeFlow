import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
constructor(private Http:HttpClient) { }
Users:User[]=[]
login(){

}
logOut(){

}
getUserFromCokkies(){

}
getUserById(id:string):Observable<User>{
  return this.Http.get<User>(`${environment.APIBaseUrl}/users/${id}`)
  }
}
