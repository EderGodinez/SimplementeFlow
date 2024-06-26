import { Router } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss']
})
export class LikeButtonComponent {
  constructor(private Router:Router){}
  @Input()
  IsOnlikesList:boolean=false
  @Output() IsOnlikesListChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  onCheckboxChange(event: any) {
    if(!localStorage.getItem('Token')){
      this.Router.navigateByUrl('SimplementeFlow/login')
      return
    }
    this.IsOnlikesList = event.target.checked; // Actualizamos el estado del checkbox
    this.IsOnlikesListChange.emit(this.IsOnlikesList); // Emitimos el mensaje al padre
  }
}
