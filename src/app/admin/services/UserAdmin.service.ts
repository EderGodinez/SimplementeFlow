import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class UserAdminService {
  constructor(private httpClient: HttpClient) { }
GetTotalUser():Observable<{TotalUsers:number}>{
  return this.httpClient.get<{TotalUsers:number}>(`${environment.APIBaseUrl}/users/total`)
}
}
