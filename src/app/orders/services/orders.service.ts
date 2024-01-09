import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../Interfaces/orders.interface';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/account/services/Account.service';
import { checkoutList } from 'src/app/interfaces/checkout.interface';
@Injectable({
  providedIn: 'root'
})
export class OrdersService{
  private API_URL=environment.APIBaseUrl
  constructor(private Http:HttpClient,private UserService:AuthService) { 
  }
Orders:Order[]=[]
GetOrders():Observable<Order[]>{
  const headers=this.UserService.getUserAutorizationHeaders()
  const UserId=this.UserService._User._id
 return this.Http.get<Order[]>(`${this.API_URL}/orders/User?UserId=${UserId}`,{headers})
}
GetOrderById(id:number):Observable<Order>{
 // const headers=this.UserService.getUserAutorizationHeaders()
  return this.Http.get<Order>(`${this.API_URL}/orders/${id}`,)//{headers}
}
createOrder(checkoutList:checkoutList):Observable<{url:string}>{
  const headers=this.UserService.getUserAutorizationHeaders()
return this.Http.post<{url:string}>(`${this.API_URL}/orders/create-checkout`,checkoutList,{headers})
}
}
