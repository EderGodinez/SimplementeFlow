import { Injectable } from '@angular/core';
import { Order } from 'src/app/orders/Interfaces/orders.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersService {

  constructor() { }
Orders:Order[]=[
  {
    numOrder: 1,
    UserId: "1",
    PayMethod: "paypal",
    Details: [
      {
        id:"1",
        productName: "Adidas Originals Superstar",
        productDescription: "Iconic Adidas Originals Superstar sneakers",
        Image: "https://m.media-amazon.com/images/I/41juvbFFlXL._AC_SY780_.jpg",
        Amount: 2,
        Price: 59.99,
        Size: 26
      }
    ],
    shipping: {
      address: {
        city: "Guadalajara",
        country: "MX",
        line1: "123 Main St",
        line2: "Apt 4B, Downtown",
        postal_code: "44100",
        state: "Jalisco"
      },
      email: "example@example.com",
      name: "John Doe",
      phone: "+523911223344",
      tax_exempt: "xempt",
      tax_ids: []
    },
    TotalPay: 119.98,
    payment_status: "paid",
    delivery_status: "cancel",
    OrderDate: new Date()
  },
  {
    numOrder: 2,
    UserId: "2",
    PayMethod: "paypal",
    Details: [
      {
        id:"8",
        productName: "Adidas Originals Superstar",
        productDescription: "Iconic Adidas Originals Superstar sneakers",
        Image: "https://m.media-amazon.com/images/I/41juvbFFlXL._AC_SY780_.jpg",
        Amount: 4,
        Price: 59.99,
        Size: 26
      }
    ],
    shipping: {
      address: {
        city: "Guadalajara",
        country: "MX",
        line1: "123 Main St",
        line2: "Apt 4B, Downtown",
        postal_code: "44100",
        state: "Jalisco"
      },
      email: "example@example.com",
      name: "John Doe",
      phone: "+523911223344",
      tax_exempt: "xempt",
      tax_ids: []
    },
    TotalPay: 239.96,
    payment_status: "paid",
    delivery_status: "shipped",
    OrderDate: new Date()
  },
  {
    numOrder: 3,
    UserId: "2",
    PayMethod: "paypal",
    Details: [
      {
        id:"1",
        productName: "Adidas Originals Superstar",
        productDescription: "Iconic Adidas Originals Superstar sneakers",
        Image: "https://m.media-amazon.com/images/I/41juvbFFlXL._AC_SY780_.jpg",
        Amount: 2,
        Price: 59.99,
        Size: 26
      }
    ],
    shipping: {
      address: {
        city: "Guadalajara",
        country: "MX",
        line1: "123 Main St",
        line2: "Apt 4B, Downtown",
        postal_code: "44100",
        state: "Jalisco"
      },
      email: "example@example.com",
      name: "John Doe",
      phone: "+523911223344",
      tax_exempt: "xempt",
      tax_ids: []
    },
    TotalPay: 119.98,
    payment_status: "paid",
    delivery_status: "pending",
    OrderDate: new Date()
  },
  {
    numOrder: 4,
    UserId: "1",
    PayMethod: "paypal",
    Details: [
      {
        id:"8",
        productName: "Adidas Originals Superstar",
        productDescription: "Iconic Adidas Originals Superstar sneakers",
        Image: "https://m.media-amazon.com/images/I/41juvbFFlXL._AC_SY780_.jpg",
        Amount: 4,
        Price: 59.99,
        Size: 26
      }
    ],
    shipping: {
      address: {
        city: "Guadalajara",
        country: "MX",
        line1: "123 Main St",
        line2: "Apt 4B, Downtown",
        postal_code: "44100",
        state: "Jalisco"
      },
      email: "example@example.com",
      name: "John Doe",
      phone: "+523911223344",
      tax_exempt: "xempt",
      tax_ids: []
    },
    TotalPay: 239.96,
    payment_status: "paid",
    delivery_status: "pending",
    OrderDate: new Date()
  },
  {
    numOrder: 5,
    UserId: "1",
    PayMethod: "paypal",
    Details: [
      {
        id:"1",
        productName: "Adidas Originals Superstar",
        productDescription: "Iconic Adidas Originals Superstar sneakers",
        Image: "https://m.media-amazon.com/images/I/41juvbFFlXL._AC_SY780_.jpg",
        Amount: 2,
        Price: 59.99,
        Size: 26
      }
    ],
    shipping: {
      address: {
        city: "Guadalajara",
        country: "MX",
        line1: "123 Main St",
        line2: "Apt 4B, Downtown",
        postal_code: "44100",
        state: "Jalisco"
      },
      email: "example@example.com",
      name: "John Doe",
      phone: "+523911223344",
      tax_exempt: "xempt",
      tax_ids: []
    },
    TotalPay: 119.98,
    payment_status: "paid",
    delivery_status: "cancel",
    OrderDate: new Date()
  },
  {
    numOrder: 6,
    UserId: "2",
    PayMethod: "paypal",
    Details: [
      {
        id:"8",
        productName: "Adidas Originals Superstar",
        productDescription: "Iconic Adidas Originals Superstar sneakers",
        Image: "https://m.media-amazon.com/images/I/41juvbFFlXL._AC_SY780_.jpg",
        Amount: 4,
        Price: 59.99,
        Size: 26
      }
    ],
    shipping: {
      address: {
        city: "Guadalajara",
        country: "MX",
        line1: "123 Main St",
        line2: "Apt 4B, Downtown",
        postal_code: "44100",
        state: "Jalisco"
      },
      email: "example@example.com",
      name: "John Doe",
      phone: "+523911223344",
      tax_exempt: "xempt",
      tax_ids: []
    },
    TotalPay: 239.96,
    payment_status: "paid",
    delivery_status: "shipped",
    OrderDate: new Date()
  },
  {
    numOrder: 7,
    UserId: "1",
    PayMethod: "paypal",
    Details: [
      {
        id:"1",
        productName: "Adidas Originals Superstar",
        productDescription: "Iconic Adidas Originals Superstar sneakers",
        Image: "https://m.media-amazon.com/images/I/41juvbFFlXL._AC_SY780_.jpg",
        Amount: 2,
        Price: 59.99,
        Size: 26
      }
    ],
    shipping: {
      address: {
        city: "Guadalajara",
        country: "MX",
        line1: "123 Main St",
        line2: "Apt 4B, Downtown",
        postal_code: "44100",
        state: "Jalisco"
      },
      email: "example@example.com",
      name: "John Doe",
      phone: "+523911223344",
      tax_exempt: "xempt",
      tax_ids: []
    },
    TotalPay: 119.98,
    payment_status: "paid",
    delivery_status: "shipped",
    OrderDate: new Date()
  },
  {
    numOrder: 8,
    UserId: "1",
    PayMethod: "paypal",
    Details: [
      {
        id:"8",
        productName: "Adidas Originals Superstar",
        productDescription: "Iconic Adidas Originals Superstar sneakers",
        Image: "https://m.media-amazon.com/images/I/41juvbFFlXL._AC_SY780_.jpg",
        Amount: 4,
        Price: 59.99,
        Size: 26
      }
    ],
    shipping: {
      address: {
        city: "Guadalajara",
        country: "MX",
        line1: "123 Main St",
        line2: "Apt 4B, Downtown",
        postal_code: "44100",
        state: "Jalisco"
      },
      email: "example@example.com",
      name: "John Doe",
      phone: "+523911223344",
      tax_exempt: "xempt",
      tax_ids: []
    },
    TotalPay: 239.96,
    payment_status: "paid",
    delivery_status: "cancel",
    OrderDate: new Date()
  },
  {
    numOrder: 9,
    UserId: "1",
    PayMethod: "paypal",
    Details: [
      {
        id:"1",
        productName: "Adidas Originals Superstar",
        productDescription: "Iconic Adidas Originals Superstar sneakers",
        Image: "https://m.media-amazon.com/images/I/41juvbFFlXL._AC_SY780_.jpg",
        Amount: 2,
        Price: 59.99,
        Size: 26
      }
    ],
    shipping: {
      address: {
        city: "Guadalajara",
        country: "MX",
        line1: "123 Main St",
        line2: "Apt 4B, Downtown",
        postal_code: "44100",
        state: "Jalisco"
      },
      email: "example@example.com",
      name: "John Doe",
      phone: "+523911223344",
      tax_exempt: "xempt",
      tax_ids: []
    },
    TotalPay: 119.98,
    payment_status: "paid",
    delivery_status: "shipped",
    OrderDate: new Date()
  },
  {
    numOrder: 10,
    UserId: "1",
    PayMethod: "paypal",
    Details: [
      {
        id:"8",
        productName: "Adidas Originals Superstar",
        productDescription: "Iconic Adidas Originals Superstar sneakers",
        Image: "https://m.media-amazon.com/images/I/41juvbFFlXL._AC_SY780_.jpg",
        Amount: 4,
        Price: 59.99,
        Size: 26
      }
    ],
    shipping: {
      address: {
        city: "Guadalajara",
        country: "MX",
        line1: "123 Main St",
        line2: "Apt 4B, Downtown",
        postal_code: "44100",
        state: "Jalisco"
      },
      email: "example@example.com",
      name: "John Doe",
      phone: "+523911223344",
      tax_exempt: "xempt",
      tax_ids: []
    },
    TotalPay: 239.96,
    payment_status: "paid",
    delivery_status: "pending",
    OrderDate: new Date()
  },
  {
    numOrder: 11,
    UserId: "1",
    PayMethod: "paypal",
    Details: [
      {
        id:"1",
        productName: "Adidas Originals Superstar",
        productDescription: "Iconic Adidas Originals Superstar sneakers",
        Image: "https://m.media-amazon.com/images/I/41juvbFFlXL._AC_SY780_.jpg",
        Amount: 2,
        Price: 59.99,
        Size: 26
      }
    ],
    shipping: {
      address: {
        city: "Guadalajara",
        country: "MX",
        line1: "123 Main St",
        line2: "Apt 4B, Downtown",
        postal_code: "44100",
        state: "Jalisco"
      },
      email: "example@example.com",
      name: "John Doe",
      phone: "+523911223344",
      tax_exempt: "xempt",
      tax_ids: []
    },
    TotalPay: 119.98,
    payment_status: "paid",
    delivery_status: "cancel",
    OrderDate: new Date('11/11/2000')
  }
]
GetAllOrders(){
  return this.Orders
}
GetOrderById(id:number):Order{
return this.Orders.filter((order)=>order.numOrder===id)[0]
}
}
