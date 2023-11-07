import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { AccountService } from '../../../../account/services/Account.service';

@Pipe({
  name: 'clientName'
})
export class ClientNamePipe implements PipeTransform {
constructor(private http:HttpClient,private AccountService:AccountService){}
  transform(id:string ): string {
    return this.AccountService.getUsernamebyId(id)
  }

}
