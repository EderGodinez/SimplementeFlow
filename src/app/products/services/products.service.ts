import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ProductsService {
  constructor(private HttpClient:HttpClient) { }
  base_url:string=environment.APIBaseUrl
 GetProductById(id:string):Observable<Product>{
  return this.HttpClient.get<Product>(`${this.base_url}/products/${id}`)
 }
 GetProductsByCategory(category:string,limit?:number,skip?:number):Observable<Product[]>{
 return this.HttpClient.get<Product[]>(`${this.base_url}/products?Category=${category}&limit=${limit}&skip=${skip}`)
 }
 GetProductsNews(limit:number,skip?:number){
  return this.HttpClient.get<Product[]>(`${this.base_url}/products/newest?limit=${limit}&skip=${skip}`)
 }
 GetProductsOffers(limit:number,skip?:number){
  return this.HttpClient.get<Product[]>(`${this.base_url}/products/offers?limit=${limit}&skip=${skip}`)
 }
 SearchProducts(search:string){
  return this.HttpClient.get<Product[]>(`${this.base_url}/products/search?query=${search}`)
 }
 GetSimilarProducts(productName:string,limit:number):Observable<Product[]>{
  return this.HttpClient.get<Product[]>(`${this.base_url}/products/similar?ProductName=${productName}&limit=${limit}`)
 }
}
