import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'generalInfoFormComponent',
  templateUrl: './general-information-form.component.html',
  styleUrls: ['./general-information-form.component.scss'],
  providers:[MessageService]
})
export class GeneralInformationFormComponent implements OnInit{
constructor(private FB:FormBuilder,private MessageService:MessageService){}
  ngOnInit(): void {
this.CaracteristicsForm=this.Carateristics
if (!this.EditProduct) {
  this.CaracteristicsForm.disable()
}
  }
@Input()
CaracteristicsDialog:boolean=false
@Input()
Carateristics:FormGroup=this.FB.group({})
@Input()
EditProduct:boolean=false;
@Output()
CaracteristicsDialogChanges:EventEmitter<boolean>=new EventEmitter<boolean>()
@Output()
CaracteristicsChanges:EventEmitter<FormGroup>=new EventEmitter<FormGroup>()
Categories:string[]=["Hombre","Mujeres","Niños","Todos"]
public CaracteristicsForm:FormGroup=this.FB.group({})
CloseGeneralDialog(){
  this.CaracteristicsChanges.emit(this.CaracteristicsForm)
  this.CaracteristicsDialogChanges.emit(false)
}
}
