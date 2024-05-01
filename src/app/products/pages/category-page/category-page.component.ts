import { Component ,inject} from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Product ,Toast} from '../../interfaces';
import { Router } from '@angular/router';
import { catchError, finalize, of, tap } from 'rxjs';

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
      this.ProductService.GetProductsByCategory(query).pipe(
        tap((products)=>{
          this.Products=products
          this._Products=products
          this.totalProducts = Math.ceil(products.length / 10) * 10;
        }),
        finalize(()=>{
          this.IsLoad=true
          this.ShowProducts = this.Products.slice(0,10);
        }),
        catchError(()=>{
         return of([])
        })
      ).subscribe()
      this.filterOptions = [
        'Sin filtro',
        'Precio de mayor a menor',
        'Precio de menor a mayor',
        'Nivel de existencias',
        'Marcas de la A a la Z',
        'Marcas de la Z a la A',
    ];
    });
  }
  ShowProducts!:Product[]
  totalProducts!:number
  IsLoad:boolean=false
  filterSelected:string=""
  filterOptions:string[]=[]
  search?:string
  Products:Product[]=[]
  _Products:Product[]=[]
  first: number = 0;
  rows: number = 10;
  NavigateFav(){
    this.router.navigate(['/Favorites'])
  }
  showMessage(mensaje: Toast) {
    const {summary,data}=mensaje;
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
  SortProducts(){
    this.IsLoad=false
    setTimeout(() => {
      switch(this.filterSelected){
        case 'Sin filtro':
          this.Products=this._Products
          break;
          case 'Precio de mayor a menor':
            this.Products.sort((a, b) => {
              const priceA = a.price;
              const priceB = b.price;
          if (priceA < priceB) {
              return 1; // Cambiado a -1 para orden ascendente (menor a mayor)
          } else if (priceA > priceB) {
              return -1; // Cambiado a 1 para orden ascendente (menor a mayor)
          } else {
              return 0;
      }
          });
            break;
            case 'Precio de menor a mayor':
              this.Products.sort((a, b) => {
                const priceA = a.price;
                const priceB = b.price;
            if (priceA < priceB) {
                return -1; // Cambiado a -1 para orden ascendente (menor a mayor)
            } else if (priceA > priceB) {
                return 1; // Cambiado a 1 para orden ascendente (menor a mayor)
            } else {
                return 0;
        }
            });
              break;
              case 'Nivel de existencias':
            this.Products.sort((productA,ProductB)=>{
              const sizesA:any=Object.values(productA.sizes).reduce((total, stock) =>  Number(total) + Number(stock), 0)
              const sizesB:any=Object.values(ProductB.sizes).reduce((total, stock) => Number(total) + Number(stock), 0)
              if (sizesA < sizesB) {
                return 1;
            } else if (sizesA > sizesB) {
                return -1;
            } else {
                return 0;
            }
            })
            break;
            case 'Marcas de la A a la Z':
              this.Products.sort((a, b) => {
                const patentNameA = a.General.patent;
                const patentNameB = b.General.patent;
            if (patentNameA < patentNameB) {
                return -1;
            } else if (patentNameA > patentNameB) {
                return 1;
            } else {
                return 0;
        }
            });
            break;
            case 'Marcas de la Z a la A':
              this.Products.sort((a, b) => {
                const patentNameA = a.General.patent;
                const patentNameB = b.General.patent;
            if (patentNameA < patentNameB) {
                return 1;
            } else if (patentNameA > patentNameB) {
                return -1;
            } else {
                return 0;
        }
            });
          break;
      }
      this.IsLoad=true
    }, 600);
  }
  onPageChange(event:any){
    this.IsLoad=false
    setTimeout(() => {
      this.first =event.first;
      this.rows=event.rows
      const last =  Math.ceil((this.first+1) / 10) * 10
      this.ShowProducts = this.Products.slice(this.first,last);
      this.IsLoad=true
    }, 1000);
  }
}
