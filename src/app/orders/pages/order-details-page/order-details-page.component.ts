import { Component } from '@angular/core';
import { Order } from '../../Interfaces/orders.interface';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { AccountService } from '../../../account/services/Account.service';
import { User } from 'src/app/interfaces/user.interfaces';

@Component({
  templateUrl: './order-details-page.component.html',
  styleUrls: ['./order-details-page.component.scss']
})
export class OrderDetailsPageComponent {
constructor(private ActivatedRoute:ActivatedRoute,private OrdersService:OrdersService,private AccountService:AccountService){
  this.ActivatedRoute.params.subscribe(params => {
    const id = params['id'];
   const user= this.OrderById(id)
    this.UserInfo=this.AccountService.getUserById(user.UserId)
  });
}
  UserInfo:User={
  _id: {$oid:""},
  email: "",
  names: "",
  lastnames:"",
  birthdate: new Date(),
  gender: "",
  phone: 0,
  password: "",
  isActive: false,
  UserRole: "",
  likes: [],
  shopping_car: [],
  }
  OrderInfo:Order={numOrder:0,UserId:"",PayMethod:"",OrderDate:new Date(),Details:[],TotalPay:0,payment_status:"",delivery_status:""}
  OrderById(id:string){
     return this.OrderInfo=this.OrdersService.GetOrderById(parseInt(id))
  }
}
