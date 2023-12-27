import { Component } from '@angular/core';
import { Order } from '../../Interfaces/orders.interface';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { AuthService } from '../../../account/services/Account.service';
import { User } from 'src/app/interfaces/user.interfaces';

@Component({
  templateUrl: './order-details-page.component.html',
  styleUrls: ['./order-details-page.component.scss']
})
export class OrderDetailsPageComponent {
constructor(private ActivatedRoute:ActivatedRoute,private OrdersService:OrdersService,private AccountService:AuthService){
  this.ActivatedRoute.params.subscribe(params => {
    const id = params['id'];
   const user= this.OrderById(id)
  this.AccountService.getUserById(user.UserId).subscribe({
    next:(user)=>{
      this.UserInfo=user
    }
  })
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
  OrderById(id:string){
     return this.OrderInfo=this.OrdersService.GetOrderById(parseInt(id))
  }
  get Totalpay(){
     return this.OrderInfo.TotalPay;
  }
}
