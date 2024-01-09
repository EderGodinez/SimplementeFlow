export interface checkoutList{
      UserId:string
      Details:ProductOrder[]
}
export interface ProductOrder{
      patent:string
    _id:string  
    productDescription: string;
    productName: string;
    Image: string;
    Size: number;
    Amount: number;
    Price: number;
}
