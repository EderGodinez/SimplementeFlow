import { Component, Input } from '@angular/core';
import { socialMedia,social,UserOptions,UserOp } from './interfaces';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector:'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router) {}
  ngOnInit() {
    // Suscríbete al evento NavigationEnd del enrutador
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Llama a tu método cuando la navegación haya terminado (cuando la ruta cambie)
        this.sidebarVisible=false
      }
    });
  }

  @Input()
  CategorieSelected:string=""
  sidebarVisible: boolean = false;
  value: string ='';
  Categories:string[]=["Woman","Men","Kids","News","Offers"]
  OptionsU:UserOptions[]=UserOp;
  socialMedia:socialMedia[]=social;
  selectOption(option: string): void {
    this.CategorieSelected = option;
  }
  Home(){
    const currentRoute = this.router.url;
    if (currentRoute !== 'SimplementeFlow/Home') {
      this.sidebarVisible=false
      this.router.navigate(['SimplementeFlow/Home']);
      return
    }
    this.sidebarVisible=false
  }
  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      // Realiza la acción que deseas cuando se presiona "Enter"
      console.log('Se presionó Enter');
      console.log(`SimplementeFlow/Products/Search/${this.value}`)
      this.router.navigateByUrl(`SimplementeFlow/Products/Search/${this.value}`)
      this.value="";

    }
  }
}
