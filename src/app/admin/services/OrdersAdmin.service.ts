import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/orders/Interfaces/orders.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
interface ProductUpdated{
  HttpStatus:number,
  message:string
}
@Injectable({providedIn: 'root'})
export class OrdersAdminService {
  constructor(private Http:HttpClient) { }
  getOrders():Observable<any[]>{
   return this.Http.get<Order[]>(`${environment.APIBaseUrl}/orders`)
  }
  updateOrderDeliverStatus(numOrder:number,status:string):Observable<ProductUpdated>{
    return this.Http.patch<ProductUpdated>(`${environment.APIBaseUrl}/orders/${numOrder}`,{status})
  }
}
