import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/products/interfaces';
import { environment } from 'src/environments/environment';
interface ProductUpdatedResponse{
  message:string
  product:Product
}
@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  constructor(private http: HttpClient) { }
API_URL:string=environment.APIBaseUrl;
RegisterNewProduct(Product:Product):Observable<Product> {
  return this.http.post<Product>(`${this.API_URL}/products`,Product)
}
getProducts():Observable<Product[]> {
      return this.http.get<Product[]>(`${this.API_URL}/products`)
  }
  updateProduct(id:string,product:Product):Observable<ProductUpdatedResponse> {
      return this.http.patch<ProductUpdatedResponse>(`${this.API_URL}/products/${id}`,product)
  }

  DeleteProduct(id:string):Observable<{message:string}> {
      return this.http.delete<{message:string}>(`${this.API_URL}/products/${id}`,)
  }
}
