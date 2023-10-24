import { Component, OnInit } from '@angular/core';
import { OrderList } from '../../Interfaces/orderslist.interface';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
@Component({
  templateUrl: './orderlist-page.component.html',
  styleUrls: ['./orderlist-page.component.scss']
})
export class OrderlistPageComponent implements OnInit{
constructor(private Router:Router,private OrderService:OrdersService){}
  ngOnInit(): void {
    const orders=this.OrderService.GetOrders()
    orders.forEach(order => {
      const {numOrder,OrderDate,TotalPay,PayMethod}=order
      this.Orders.push({numOrder:numOrder,date:OrderDate,total:TotalPay,method:PayMethod})
    });
  }

Orders:OrderList[]=[]
ShowDetails(id:number){
this.Router.navigateByUrl(`SimplementeFlow/Orders/list/${id}`);
}
}
