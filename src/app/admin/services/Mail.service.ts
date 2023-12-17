import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface TotalResponse{
totalMessages:string
status:number
}
interface Message{
  _id:string
  username:string
  status:string
  UserEmail:string
  issue:string
  Content:string
}

@Injectable({providedIn: 'root'})
export class MailService {
  constructor(private Http:HttpClient) { }
  GetMessages():Observable<Message[]>{
    return this.Http.get<Message[]>(`${environment.APIBaseUrl}/Messages`)
  }
  GetTotalPendient():Observable<TotalResponse>{
    return this.Http.get<TotalResponse>(`${environment.APIBaseUrl}/Messages/Total`)
  }
}
