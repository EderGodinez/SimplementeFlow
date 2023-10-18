import { Component ,inject} from '@angular/core';
import { ProductsService } from '../../products.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Product ,Toast} from '../../interfaces';
import { Router } from '@angular/router';
@Component({
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  providers:[MessageService]
})
export class SearchPageComponent {
  constructor(private ProductService:ProductsService,private MessageService:MessageService,private route:ActivatedRoute,private router:Router){}
  ngOnInit() {
    // Recoge el valor del parámetro 'id' de la URL
    this.route.params.subscribe(params => {
      const category = params['query'];
    });
  }
  NavigateFav(){
    this.router.navigate(['SimplementeFlow/Favorites'])
  }
  showMessage(mensaje: Toast) {
    const {summary,data}=mensaje;
    console.log(mensaje)
    try{
      this.MessageService.add({summary,data});
    }
    catch{
      throw new Error('Este es un error de ejemplo');
    }
  }
  get Products():Product[]{
    return this.ProductService.GetProductsByCategory()
  }

}
