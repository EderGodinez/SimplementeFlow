export interface Order {
  numOrder: number
  UserId: string
  PayMethod: string
  Details: Detail[]
  shipping?: Shipping
  TotalPay: number
  payment_status: string
  delivery_status: string
  OrderDate: Date
}

export interface Detail {
  id:string
  productName: string
  productDescription: string
  Image: string
  Amount: number
  Price: number
  Size: number
}

export interface Shipping {
  address: Address
  email: string
  name: string
  phone: string
  tax_exempt: string
  tax_ids: any[]
}

export interface Address {
  city: string
  country: string
  line1: string
  line2: string
  postal_code: string
  state: string
}
