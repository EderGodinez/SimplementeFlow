import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss']
})
export class LikeButtonComponent {
  isChecked: boolean = false;
  @Output() checkboxChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  onCheckboxChange(event: any) {
    this.isChecked = event.target.checked; // Actualizamos el estado del checkbox
    this.checkboxChanged.emit(this.isChecked); // Emitimos el mensaje al padre
  }
}
