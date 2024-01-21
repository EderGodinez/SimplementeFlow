import { ShoppingCar } from 'src/app/interfaces/user.interfaces';
import { getUserAutorizationHeaders } from './../../helpers/getHeader';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../Interfaces/orders.interface';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/account/services/Account.service';
interface checkout{
  UserId:string
  Details:ShoppingCar[]
}
@Injectable({
  providedIn: 'root'
})
export class OrdersService{
  private API_URL=environment.APIBaseUrl
  constructor(private Http:HttpClient,private UserService:AuthService) {
  }
Orders:Order[]=[]
GetOrders():Observable<Order[]>{
  const headers=getUserAutorizationHeaders()
  const UserId=this.UserService._User._id
 return this.Http.get<Order[]>(`${this.API_URL}/orders/User?UserId=${UserId}`,{headers})
}
GetOrderById(id:number):Observable<Order>{
 const headers=getUserAutorizationHeaders()
  return this.Http.get<Order>(`${this.API_URL}/orders/${id}`,{headers})//{headers}
}
createOrder(checkoutList:checkout):Observable<{url:string}>{
  const headers=getUserAutorizationHeaders()
return this.Http.post<{url:string}>(`${this.API_URL}/orders/create-checkout`,checkoutList,{headers})
}
}
