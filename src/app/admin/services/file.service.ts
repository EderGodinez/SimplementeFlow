import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class FilesService {
  constructor(private http:HttpClient) { }
DeleteFile(filename:string):Observable<{message:string}>{
  return this.http.delete<{message:string}>(`${environment.APIBaseUrl}/files/${filename}`);
}

}
