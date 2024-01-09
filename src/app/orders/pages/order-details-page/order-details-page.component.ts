import { Component, OnInit } from '@angular/core';
import { Order } from '../../Interfaces/orders.interface';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { AuthService } from '../../../account/services/Account.service';
import { User } from 'src/app/interfaces/user.interfaces';

@Component({
  templateUrl: './order-details-page.component.html',
  styleUrls: ['./order-details-page.component.scss']
})
export class OrderDetailsPageComponent implements OnInit {
constructor(private ActivatedRoute:ActivatedRoute,private OrdersService:OrdersService,private AccountService:AuthService){
  this.ActivatedRoute.params.subscribe(params => {
    const id = params['id'];
    this.OrdersService.GetOrderById(id).subscribe({
       next:(order)=> {
         this.OrderInfo=order
       },
    })
  
  });
}
  ngOnInit(): void {
    this.UserInfo=this.AccountService.User
  }
  UserInfo:User={
  _id:"",
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
  RegisterDate:new Date(),
  data_Address:{
    City:"",
    Cologne:"",
    number:"",
    postal_Code:0,
    State:"",
    Street:""
  }
  }
  OrderInfo:Order={_id:"",numOrder:0,UserId:"",PayMethod:"",OrderDate:new Date(),Details:[],TotalPay:0,payment_status:"",delivery_status:""}
  get Totalpay(){
     return this.OrderInfo.TotalPay;
  }
}
