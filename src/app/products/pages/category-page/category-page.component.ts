import { Component ,inject} from '@angular/core';
import { ProductsService } from '../../products.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Product ,Toast} from '../../interfaces';
import { Router } from '@angular/router';
import { query } from '@angular/animations';
import { General } from '../../interfaces/product.interface';
interface filters{
  label:string
  method:void
}
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
      const query = params['query'];
this.search=query
    });
  }
  search:string=""
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
  NavigateHome(){
    this.router.navigate(['Home'])
  }
  get Products():Product[]{
    return this.ProductService.GetProductsByCategory().filter(search=>
      search.ProductName.toLowerCase().includes(this.search.toLowerCase())||
      search.General.Category===this.search||
      search.General.patent===this.search
       )
  }
  ProductFilters:string[]=['Filtrar por precio de menor a mayor','Filtrar por precio de mayor a menor','Filtrar por orden A a la Z','Filtar por orden Z a la A','Limpiar']
  filterProducts(option:string){
    switch(option){
      case 'Filtrar por precio de menor a mayor':
        this.filterByPriceInc()
      break;
      case 'Filtrar por precio de mayor a menor':
        this.filterByPriceDes()
      break;
      case 'Filtrar por orden A a la Z':
        this.filterByNameinc()
      break;
      case 'Filtar por orden Z a la A':
        this.filterByNameDes()
      break;
      case 'Limpiar':
        this.cleanFilter()
      break;
    }

  }
filterByPriceInc(){
  console.log('filterbyPriceInc')
}
filterByPriceDes(){
  console.log('filterbyPriceDes')
}
filterByNameinc(){
  console.log('filterbyNameInc')
}
filterByNameDes(){
  console.log('filterbyNameDes')
}
cleanFilter(){
  console.log('CleanFilters')
}
}
