import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../../interfaces/Messages.interface';
import { MailService } from '../../services/Mail.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-message',
  templateUrl: './detail-message.component.html',
  styleUrls: ['./detail-message.component.scss'],
  providers:[MessageService]
})
export class DetailMessageComponent implements OnInit,OnDestroy{
constructor(private ActivatedRoute:ActivatedRoute,private MailService:MailService,private MessageService:MessageService,private Router:Router){
  //Se extrae el id de la url
  this.ActivatedRoute.params.subscribe(params => {
    this.MessageId = params['id'];
})
}
  ngOnInit(): void {
    this.AJAX$=this.MailService.GetMessageById(this.MessageId).subscribe({
      next:(message)=>{
        this.Message=message
      },
      error:(error)=>{
        this.MessageService.add({severity:'error',life:2000,detail:error.message,summary:'Error al obtener cantenido de mensaje'})
      },
    })
  }
  ngOnDestroy(): void {
    this.AJAX$.unsubscribe()
  }
  AJAX$:Subscription=new Subscription()
  NavigateList(){
    this.Router.navigateByUrl('Admin/messages/list')
  }
MessageId:string='';
Message:Message={_id:"",Content:"",issue:"",MessageDate:new Date(),status:"",UserEmail:"",username:""};
}
