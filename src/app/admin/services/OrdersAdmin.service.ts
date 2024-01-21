import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/orders/Interfaces/orders.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TotalProductSold } from '../interfaces/TotalProductSold.interface';
import { ProductUpdated } from '../interfaces/ProductUpdatedResponse.interface';
import { ChartsResponse } from '../interfaces/ChartsResponse.interface';
import { getUserAutorizationHeaders } from 'src/app/helpers/getHeader';

@Injectable({providedIn: 'root'})
export class OrdersAdminService {
  constructor(private Http:HttpClient) { }
  get headers(){
    const headers=getUserAutorizationHeaders()
    return headers
  }
  getOrders():Observable<any[]>{
   return this.Http.get<Order[]>(`${environment.APIBaseUrl}/orders`,{headers:this.headers})
  }
  updateOrderDeliverStatus(numOrder:number,status:string):Observable<ProductUpdated>{
    return this.Http.patch<ProductUpdated>(`${environment.APIBaseUrl}/orders/${numOrder}`,{status},{headers:this.headers})
  }
  GetMostSelledProducts():Observable<TotalProductSold[]>{
    return this.Http.get<TotalProductSold[]>(`${environment.APIBaseUrl}/orders/mostSelled`,{headers:this.headers})
  }
  GetEarnings():Observable<{TotalEarnings:number}[]>{
    return this.Http.get<{TotalEarnings:number}[]>(`${environment.APIBaseUrl}/orders/earninigs`,{headers:this.headers})
  }
  GetChartsData():Observable<ChartsResponse>{
    return this.Http.get<ChartsResponse>(`${environment.APIBaseUrl}/orders/info`,{headers:this.headers})
  }
}
