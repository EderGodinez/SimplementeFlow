import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message,MessageDto } from '../interfaces/Messages.interface';
import { TotalResponse } from '../interfaces/TotalMessages.interface';
import { getUserAutorizationHeaders } from 'src/app/helpers/getHeader';




@Injectable({providedIn: 'root'})
export class MailService {
  constructor(private Http:HttpClient) { }
  PendientMessages:string="0"
  setpendientMessages(messages:string){
    this.PendientMessages=messages
  }
  get headers(){
    return getUserAutorizationHeaders()
  }
  GetMessages():Observable<Message[]>{
    return this.Http.get<Message[]>(`${environment.APIBaseUrl}/messages`,{headers:this.headers})
  }
  GetMessageById(id:string):Observable<Message>{
    return this.Http.get<Message>(`${environment.APIBaseUrl}/messages/${id}`,{headers:this.headers})
  }
  GetTotal(status:string):Observable<TotalResponse>{
    return this.Http.get<TotalResponse>(`${environment.APIBaseUrl}/messages/Total?status=${status}`,{headers:this.headers})
  }
  UpdateMessageStatus(MessageUpdated:Message):Observable<Message>{
    const {_id}=MessageUpdated
    return this.Http.patch<Message>(`${environment.APIBaseUrl}/messages/${_id}`,MessageUpdated,{headers:this.headers})
  }
  SentMessage(MessageForm:MessageDto):Observable<Message>{
    return this.Http.post<Message>(`${environment.APIBaseUrl}/messages`,MessageForm)
  }
}
