import { MailService } from './../../services/Mail.service';
import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { navOptions } from './navOptions';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'admin-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations:[
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})

export class SidenavComponent implements OnInit,OnDestroy {
  constructor(private MailService:MailService){
    // this.AJAX$=this.MailService.GetTotalPendient().subscribe({
    //   next:(messages)=>{
    //   this.PendientMessages=messages.totalMessages.toString()
    //   },
    //   error:(error)=>{
    //     console.error(error.message)
    //   }
    // })
  }
  ngOnDestroy(): void {
    this.AJAX$.unsubscribe()
  }
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navOptions;
  PendientMessages:string='0';
  AJAX$:Subscription=new Subscription()
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  ngOnInit(): void {
      this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
