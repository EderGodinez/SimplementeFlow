import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ValidatorService } from 'src/app/validators/validator.service';

@Component({
  selector: 'adventagesformComponent',
  templateUrl: './adventages-form.component.html',
  styleUrls: ['./adventages-form.component.scss'],
  providers:[MessageService]
})
export class AdventagesFormComponent implements OnInit {
  constructor(private FB:FormBuilder,private messageService:MessageService,private ValidatorService:ValidatorService){}
  ngOnInit(): void {
    this.AdventagesForm=this.Adventages
    if (!this.EditProduct) {
      this.AdventagesForm.disable()
    }
  }
  @Input()
  AdventageDialog:boolean=true
  @Output()
  AdventageDialogChange:EventEmitter<boolean>=new EventEmitter<boolean>()
  @Input()
  Adventages:FormGroup=this.FB.group({})
  @Output()
  AdventagesChanges:EventEmitter<FormGroup>=new EventEmitter<FormGroup>()
  @Input()
  EditProduct:boolean=false;
  public AdventagesForm:FormGroup= this.FB.group({})

  get AdventagesControls(){
    return this.AdventagesForm.get('Adventages') as FormArray
  }
  get DisadventagesControls(){
    return this.AdventagesForm.get('Disaventages') as FormArray
  }
  addAdventage(){
    const adventages=this.DisadventagesControls
    if (adventages!.length<5) {
      const newControl:FormControl=this.FB.control('',[Validators.required])
      adventages!.push(newControl)
    }
    else{
      this.messageService.add({severity:'error',summary:'Limite de desventajas capturadas',life:4000})
    }
  }
  addDisadventage(){
    const disadventages=this.AdventagesControls
        if(disadventages!.length<5){
           const newControl=this.FB.control('',[Validators.required])
           disadventages!.push(newControl)
        }
        else{
          this.messageService.add({severity:'error',summary:'Limite de ventaja capturadas',life:4000})
        }
  }
  CloseAdventageDialog(){
    if(this.Adventages.valid){
      this.AdventagesChanges.emit(this.Adventages)
      this.AdventageDialogChange.emit(false)
    }
    else{
    this.messageService.add({severity:'error',summary:'Minimo de campos',detail:'Por lo menos tiene que tener un campo valido',life:4000})
    }
  }
  isvalidFieldInArray(FormArray:FormArray,index:number){
    return this.ValidatorService.isvalidFieldInArray(FormArray,index)
  }

}
