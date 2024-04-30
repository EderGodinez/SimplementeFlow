import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getUserAutorizationHeaders } from 'src/app/helpers/getHeader';

@Injectable({providedIn: 'root'})
export class UserAdminService {
  constructor(private httpClient: HttpClient) { }
  get headers(){
    const headers=getUserAutorizationHeaders()
    return headers
  }
GetTotalUser():Observable<{TotalUsers:number}>{
  return this.httpClient.get<{TotalUsers:number}>(`${environment.APIBaseUrl}/users/total`,{headers:this.headers})
}
}
