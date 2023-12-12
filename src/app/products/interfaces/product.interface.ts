export interface Product {
  _id: string
  ProductName: string
  description: string
  price: number
  sizes: any
  images: string[]
  General: General
  adventages: string[]
  disadventages: string[]
  Discount:number;
  inventoryStatus:string
  RegisterDate:Date|''
  __v: number
}
export interface Sizes {
  [key:number]:number
  // 20: number
  // 21: number
  // 22: number
  // 23: number
  // 24: number
  // 25: number
  // 26: number
  // 27: number
  // 28: number
  // 29: number
  // 30: number
}

export interface General {
  patent: string
  model: string
  Category: string
  age: string
  width_type: string
  fit_type: string
  class_shoes: string
  E_Material: string
  I_Material: string
  Shoe_sole: string
}


