import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductValidatorService } from '../../services/validator.service';

@Component({
  selector: 'generalInfoFormComponent',
  templateUrl: './general-information-form.component.html',
  styleUrls: ['./general-information-form.component.scss'],
})
export class GeneralInformationFormComponent implements OnInit{
constructor(private FB:FormBuilder,private validatorService:ProductValidatorService){}
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
Categories:string[]=["Hombres","Mujeres","Niños","Todos"]
public CaracteristicsForm:FormGroup=this.FB.group({})
CloseGeneralDialog(){
  this.Carateristics.markAllAsTouched()
  if(this.Carateristics.valid){
    this.CaracteristicsChanges.emit(this.CaracteristicsForm)
    this.CaracteristicsDialogChanges.emit(false)
  }
}
IsValidField(field:string){
return this.validatorService.isValidField(this.CaracteristicsForm,field)
}
GetErrorMessage(field:string){
return this.validatorService.getFieldError(this.CaracteristicsForm,field)
}
}
