import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent {
constructor(private router:Router){}
Home(){
  this.router.navigateByUrl('SimplementeFlow/Home');
}
}
