import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
constructor() { }
Users:User[]=[
  {
    _id: {
      $oid: "1"
    },
    email: "usuario1@example.com",
    names: "Juan",
    lastnames: "Pérez",
    birthdate:new Date(),
    gender: "Male",
    phone: 5551234567,
    password: "12345678Aa",
    isActive: true,
    UserRole: "Client",
    likes: [],
    shopping_car: [],
    data_Address: {
      Street: "Calle Principal",
      number: "123",
      postal_Code: 12345,
      Cologne: "Centro",
      State: "CDMX",
      City: "Ciudad de México"
    },
    __v: 0
  },
  {
    _id: {
      $oid: "2"
    },
    email: "usuario2@example.com",
    names: "María",
    lastnames: "González",
    birthdate:new Date(),
    gender: "Female",
    phone: 5559876543,
    password: "Aa12345678",
    isActive: true,
    UserRole: "Client",
    likes: [],
    shopping_car: [],
    data_Address: {
      Street: "Avenida Principal",
      number: "567",
      postal_Code: 54321,
      Cologne: "Zona Residencial",
      State: "Nuevo León",
      City: "Monterrey"
    },
    __v: 0
  }
]
login(){

}
logOut(){

}
getUserFromCokkies(){

}
getUserById(id:string):User{
  return this.Users.filter((user)=>user._id?.$oid===id)[0]
}
}
