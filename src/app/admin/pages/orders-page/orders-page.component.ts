import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';

import { Order } from 'src/app/orders/Interfaces/orders.interface';
import { AdminOrdersService } from './services/orders.service';
import { User } from '../../../interfaces/user.interfaces';
import { AccountService } from '../../../account/services/Account.service';
import { SortEvent } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {
  constructor(private OrdersService:AdminOrdersService,private AccountService:AccountService,private Router:Router){
    this.Orders=this.OrdersService.GetAllOrders()
  }
  ngOnInit(): void {
    this.cols = [
      { field: 'code', header: 'code' },
      { field: 'Client', header: 'Client' },
      { field: 'date', header: 'date' },
      { field: 'Total', header: 'Total' },
      { field: 'Method', header: 'Method' },
      { field: 'OrderStatus', header: 'OrderStatus' }
  ]
  }
  ViewDetailsDailog:boolean=false
  OrderCompleteDialog:boolean=false
  OrderCancelDialog:boolean=false
  order:any={}
  clientInfo:User=
  {
    _id: {
      $oid: ""
    },
    email: "",
    names: "",
    lastnames: "",
    birthdate:new Date(),
    gender: "",
    phone:0 ,
    password: "",
    isActive: true,
    UserRole: "",
    likes: [],
    shopping_car: [],
    data_Address: {
      Street: " ",
      number: "",
      postal_Code:0 ,
      Cologne: " ",
      State: " ",
      City: ""
    },
  }
  Orders: Order[] = [];
  cols: any[] = [];
  onGlobalFilter(table: Table, event: Event) {
    const searchText = (event.target as HTMLInputElement).value;
    table.filterGlobal(searchText, 'contains');
}
ChangesOrderStatus(statusValue:string){
  this.Orders.map(order=>{
    if (this.order.numOrder===order.numOrder) {
      order.delivery_status=statusValue
    }
  })
  this.OrderCompleteDialog=false
  this.OrderCancelDialog=false
}

ViewOrderDitails(order: Order) {
  this.clientInfo=this.AccountService.getUserById(order.UserId)
  this.order = {...order };
  this.ViewDetailsDailog = true;
}
showDialog(order:Order,dialog:string){
  this.order=order
  if (dialog==='OrderCompleteDialog')
  this.OrderCompleteDialog=true
  else
  this.OrderCancelDialog=true
}
GoHome(){
  this.Router.navigate(['Home'])
  }
}
