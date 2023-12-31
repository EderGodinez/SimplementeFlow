
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CheckTokenResponse } from '../interfaces/CheckTokenResponse.interface';

@Injectable({providedIn: 'root'})
export class GuardsService {
  constructor(private httpClient: HttpClient) { }
  private setAutentication(token:string):boolean{
    localStorage.setItem('Token',token);
    return true;
  }
  JoinOnDashboard:boolean=false
  checkAuthStatus():Observable<CheckTokenResponse> {
    const url   = `${ environment.APIBaseUrl }/users/check-token`;
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);
      return this.httpClient.get<CheckTokenResponse>(url, { headers })
  }
}
