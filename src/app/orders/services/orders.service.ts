import { Injectable } from '@angular/core';
import { Order } from '../Interfaces/orders.interface';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() { }
Orders:Order[]=[]
GetOrders(){
  return this.Orders
}
GetOrderById(id:number):Order{
return this.Orders.filter((order)=>order.numOrder===id)[0]
}
}
