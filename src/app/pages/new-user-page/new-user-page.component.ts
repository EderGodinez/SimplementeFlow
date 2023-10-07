import { Component, OnInit } from '@angular/core';
interface MenuItem{
label:string,
routerLink:string
}
@Component({
  templateUrl: './new-user-page.component.html',
  styleUrls: ['./new-user-page.component.scss']
})

export class NewUserPageComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          {
              label: 'Register',
              routerLink: 'register'
          },
          {
              label: 'Confirm email',
              routerLink: 'VerifyAccount'
          },
          {
              label: 'Account created',
              routerLink: 'Success'
          },
      ];
  }
}
