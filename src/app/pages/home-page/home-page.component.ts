import { Component } from '@angular/core';
import { adverticers,advertice } from './advertices';
@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  adverticers:advertice[]=adverticers
}
