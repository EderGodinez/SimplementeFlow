import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class FileService {
  constructor(private http:HttpClient) { }
uploadFiles(files:File[],name:string){
  const formData = new FormData()
  let NFiles:File[]=[]
  files.forEach((file, index) => {
    const extension = file.name.substring(file.name.lastIndexOf('.'));
    const nuevoNombre = `${name}_${index + 1}${extension}`;
    const nuevoArchivo = new File([file], nuevoNombre, { type: file.type });
    NFiles.push(nuevoArchivo);
  });
    for (let i = 0; i < NFiles.length; i++) {
      formData.append('files', NFiles[i], NFiles[i].name);
    }
    formData.append('ProductName', name);
return this.http.post<string>(`${environment.APIBaseUrl}/files/upload`,formData)
.subscribe(
  (resp) => {
    console.log('Respuesta exitosa:', resp);
  },
  (error) => {
    console.error('Error en la respuesta:', error);

    if (error.error instanceof ErrorEvent) {
      console.error('Error en el lado del cliente:', error.error.message);
    } else {
      console.error('Código de estado:', error.status);
      console.error('Error:', error.error);
    }
  }
);
}

}
