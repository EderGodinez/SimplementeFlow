import { Component, Input } from '@angular/core';
import { socialMedia,social,UserOptions,UserOp } from '../../interfaces/index.interface';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../account/services/Account.service';
import { GuardsService } from 'src/app/admin/services/Guards.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector:'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router,private AuthService:AuthService,private GuardsService:GuardsService) {}
  ngOnInit() {
    //Validar que el token es aun valido de la sesion
    this.GuardsService.checkAuthStatus().pipe(
      tap((reponse)=>{
        this.AuthService.User=reponse.User
      }),
      catchError(err => {
        console.error(err);
        localStorage.removeItem('Token')
        return of(false);
      })
    ).subscribe()
    // Suscríbete al evento NavigationEnd del enrutador
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Llama a tu método cuando la navegación haya terminado (cuando la ruta cambie)
        this.sidebarVisible=false
      }
    });
  }
  get Islog(){
    return localStorage.getItem('Token')?true:false
  }
  @Input()
  CategorieSelected:string=""
  sidebarVisible: boolean = false;
  value: string ='';
  Categories:string[]=["Mujer","Hombre","Niños","Nuevos productos","Ofertas"]
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
