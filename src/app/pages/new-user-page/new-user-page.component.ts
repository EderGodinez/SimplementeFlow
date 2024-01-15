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
              label: 'Registro',
              routerLink: 'register'
          },
          {
              label: 'Confirmar correo',
              routerLink: 'VerifyAccount'
          },
          {
              label: 'Cuenta creada',
              routerLink: 'Success'
          },
      ];
  }
}
