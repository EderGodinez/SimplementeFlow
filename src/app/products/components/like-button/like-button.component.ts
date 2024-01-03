import { Router } from '@angular/router';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss']
})
export class LikeButtonComponent {
  constructor(private Router:Router){}
  isChecked: boolean = false;
  @Output() checkboxChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  onCheckboxChange(event: any) {
    if(!localStorage.getItem('Token')){
      this.Router.navigateByUrl('SimplementeFlow/login')
      return 
    }
    this.isChecked = event.target.checked; // Actualizamos el estado del checkbox
    this.checkboxChanged.emit(this.isChecked); // Emitimos el mensaje al padre
  }
}
