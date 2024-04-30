import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getUserAutorizationHeaders } from 'src/app/helpers/getHeader';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class FilesService {
  constructor(private http:HttpClient) { }
DeleteFile(filename:string):Observable<{message:string}>{
  const headers=getUserAutorizationHeaders()
  return this.http.delete<{message:string}>(`${environment.APIBaseUrl}/files/${filename}`,{headers});
}

}
