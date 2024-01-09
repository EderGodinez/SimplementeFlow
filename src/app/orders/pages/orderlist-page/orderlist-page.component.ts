import { Component, OnInit } from '@angular/core';
import { OrderList } from '../../Interfaces/orderslist.interface';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../Interfaces/orders.interface';
@Component({
  templateUrl: './orderlist-page.component.html',
  styleUrls: ['./orderlist-page.component.scss']
})
export class OrderlistPageComponent implements OnInit{
constructor(private Router:Router,private OrderService:OrdersService){}
  ngOnInit(): void {
    let orders:Order[]=[]
    this.OrderService.GetOrders().subscribe({
      next:(ordersResponse)=> {
        orders=ordersResponse
        this.OrderService.Orders=ordersResponse
      },
      error:(err)=> {
        console.error(err)
      },
      complete:()=> {
        if (orders.length>0) {
          orders.forEach(order => {
            const {numOrder,OrderDate,TotalPay,PayMethod}=order
            this.Orders.push({numOrder:numOrder,date:OrderDate,total:TotalPay,method:PayMethod})
          })   
          return
        }
        else{
          orders=[]
        }
       ;    
      },
    })
    
  }

Orders:OrderList[]=[]
ShowDetails(id:number){
this.Router.navigateByUrl(`SimplementeFlow/Orders/list/${id}`);
}
}
