
export interface User {
  _id?: Id
  email: string
  names: string
  lastnames: string
  birthdate: Date
  gender: string
  phone: number
  password: string
  isActive: boolean
  UserRole: string
  likes: string[]
  shopping_car: []
  data_Address?: DataAddress
  __v?: number
}

export interface Id {
  $oid: string
}

export interface DataAddress {
  Street: string
  number: string
  postal_Code: number
  Cologne: string
  State: string
  City: string
}
export interface ShoppingCar{
  ProductId:string,
  size:number,
  quantity:number
}
