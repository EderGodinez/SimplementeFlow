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
        this.totalorders = Math.ceil(orders.length / 10) * 10;
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
          this.ShowOrders = this.Orders.slice(0,10);
          return
        }
        else{
          orders=[]
        }
        this.totalorders = Math.ceil(orders.length / 10) * 10;
      },
    })

  }
  ShowOrders!:OrderList[]
  totalorders!:number
  first: number = 0;
  rows: number = 10;
Orders:OrderList[]=[]
ShowDetails(id:number){
this.Router.navigateByUrl(`/Orders/list/${id}`);
}
onPageChange(event: any) {
  this.first =event.first;
  this.rows=event.rows
  const last =  Math.ceil((this.first+1) / 10) * 10
  this.ShowOrders = this.Orders.slice(this.first,last);
}
}
