import { Component, OnDestroy, OnInit } from '@angular/core';
import { Table } from 'primeng/table';

import { Order } from 'src/app/orders/Interfaces/orders.interface';
import { User } from '../../../interfaces/user.interfaces';
import { AuthService } from '../../../account/services/Account.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { OrdersAdminService } from '../../services/OrdersAdmin.service';
import { Subscription, catchError, finalize, of, switchMap, tap } from 'rxjs';

@Component({
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
  providers:[MessageService]
})
export class OrdersPageComponent implements OnInit,OnDestroy {
  constructor(private toast:MessageService,private OrdersAdminService:OrdersAdminService,private AccountService:AuthService,private Router:Router){
    //SE descarto YA QUE EL PERFORMANCE ERA MENOS EFICIENTE QUE EL USADO
    this.AJAX$=this.OrdersAdminService.getOrders().pipe(
      switchMap(orders=>{
        return orders.map((order) => {
          const Username = order.UserId.names+' '+order.UserId.lastnames;
          order.UserId=order.UserId._id
          return { ...order, Username };
        })
      }),
      tap((order)=>{
        this.Orders.push(order)
      }),
      catchError((error) => {
      this.toast.add({detail:error.message,severity:'error',life:3000,summary:'Error al obtener ordenes'})
       return of([]);
      }),finalize(()=>{
        this.toast.add({detail:'Ordenes cagadas con exito',severity:'success',life:3000,summary:'Carga completa'})
      })
        ).subscribe()
      }
      ngOnInit(): void {

      }
      ngOnDestroy(): void {
    this.AJAX$.unsubscribe()
  }
  AJAX$:Subscription=new Subscription()
  ViewDetailsDailog:boolean=false
  OrderCompleteDialog:boolean=false
  OrderCancelDialog:boolean=false
  order:Order={
   _id:"",
   delivery_status:"" ,
   Details:[],
   numOrder:0,
   OrderDate:new Date(),
   payment_status:"",
   PayMethod:"",
   TotalPay:0,
   UserId:"",
   shipping:{},
   Username:""
  }
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
    RegisterDate:new Date(),
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
  this.OrdersAdminService.updateOrderDeliverStatus(this.order.numOrder,statusValue).subscribe({
    next:(resp)=>{
      this.toast.add({detail:resp.message,severity:'success',life:3000,summary:'Orden actualizada'})
    },
    error:(error)=>{
      this.toast.add({detail:error.message,severity:'error',life:3000,summary:'Error al actualizar status'})
    },
    complete:()=>{
      const index=this.Orders.findIndex(order=>order.numOrder===this.order.numOrder)
      this.Orders[index].delivery_status=statusValue
      this.OrderCompleteDialog=false
      this.OrderCancelDialog=false
    }
  })
}

ViewOrderDitails(order: Order) {
  this.AccountService.getUserById(order.UserId).subscribe({
    next:(user)=>{
      this.clientInfo=user
    },
    error:(err)=>{
      this.toast.add({severity:'error',life:3000,summary:'Error',detail:err.message})
    },
    complete:()=>{
      this.order = {...order };
      this.ViewDetailsDailog = true;
    }
  })
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
