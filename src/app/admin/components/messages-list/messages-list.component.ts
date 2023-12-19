import { Table } from 'primeng/table';
import { MailService } from '../../services/Mail.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../../interfaces/Messages.interface';
import { Subscription, delay, finalize, tap } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesPageComponent implements OnInit,OnDestroy {
constructor(private MailService:MailService,private Router:Router){}
  ngOnInit(): void {
   this.AJAX$=this.MailService.GetMessages().pipe(
      delay(800),
      tap((messages)=>{
        this.Messages=messages
      }),
      finalize(()=>this.TableLoad=true)
    ).subscribe()
  }
  ngOnDestroy(): void {
    this.AJAX$.unsubscribe()
  }
  AJAX$:Subscription=new Subscription();
  Messages:Message[]=[]
  MessageSelected:any
  TableLoad:boolean=false
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}
ReloadMessages(){
  this.AJAX$=this.MailService.GetMessages().pipe(
    delay(1000),
    tap((messages)=>{
      this.Messages=messages
    }),
    finalize(()=>this.TableLoad=true)
  ).subscribe()
}
ViewMessage(event:any){
  if (event.data.status==='Pendiente') {
    const index=this.Messages.findIndex(message=>message===event.data._id)
    event.data.status='Leido'
    this.MailService.UpdateMessageStatus(event.data).subscribe({
      next:(response)=>{
        this.Messages[index]=response
      },
      error:(e)=>{
        console.error(e.message)
      },
      complete:()=>{
        this.MailService.PendientMessages=(parseInt(this.MailService.PendientMessages)-1).toString()
      }
    })
  }
  this.Router.navigateByUrl(`Admin/messages/detail/${event.data._id}`)

}


}
