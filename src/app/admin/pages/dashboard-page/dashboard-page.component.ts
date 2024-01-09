import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription, filter, map, takeLast, tap,  } from 'rxjs';
import { Product } from 'src/app/products/interfaces';
import { AdminProductService } from '../../services/Adminproduct.service';
import { environment } from 'src/environments/environment';
import { TotalProductSold } from '../../interfaces/TotalProductSold.interface';
import { OrdersAdminService } from '../../services/OrdersAdmin.service';
import { UserAdminService } from '../../services/UserAdmin.service';
import { GuardsService } from '../../services/Guards.service';

@Component({
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit,OnDestroy{
  items!: MenuItem[];
  products!: Product[];
  chartData: any;
  chartOptions: any;
  subscription!: Subscription;
  PendientOrders:number=0
  Earnings:number=0
  NumUsers:number=0
  NumStock:number=0
  constructor(private Router:Router,private productService:AdminProductService,private OrdersService:OrdersAdminService,private userService:UserAdminService,private Guard:GuardsService) {}
  ngOnInit() {
      this.subscription=this.productService.getProducts().pipe(
      takeLast(5)).subscribe({
      next:(lastProducts)=>{
        this.products=lastProducts
      },
      error:(error)=>{
        console.error('Error al obtener los últimos productos:', error);
      }
      });
      this.subscription=this.OrdersService.GetMostSelledProducts().subscribe({
        next:(most)=>{
          this.MostSold=most
        }
      })
      this.InitCards()//Inicializar tarjetas de ganancias , usuarios, stock
      this.GetchartData()//Obtener datos de charts
      this.initChart();
  }
  apiURL:string=environment.APIBaseUrl
  MostSold:TotalProductSold[]=[]
  monthsChart:string[]=[]
  userDataChart:number[]=[]
  salesDataCharts:number[]=[]
  get CurrentMonth(){
    return new Date()
  }
  initChart() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.chartData = {
          labels:this.monthsChart,// ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
          datasets: [
              {
                  label: 'Usuarios registrados',
                  data: this.userDataChart,//[65, 59, 80, 81, 56, 55, 40]
                  fill: false,
                  backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                  borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                  tension: .4
              },
              {
                  label: 'Ventas',
                  data: this.salesDataCharts,//[28, 48, 40, 19, 86, 27, 90]
                  fill: false,
                  backgroundColor: documentStyle.getPropertyValue('--green-600'),
                  borderColor: documentStyle.getPropertyValue('--green-600'),
                  tension: .4
              }
          ]
      };
      this.chartOptions = {
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              y: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };
  }
  viewProduct(){
    this.Router.navigateByUrl('/Admin/products')
  }
  InitCards():void{
    //Inicializar tarjeta de Ordenes pendientes
    this.OrdersService.getOrders().pipe(
      map(orders => orders.filter(order => order.delivery_status === 'Pendiente'))
      ).subscribe(filteredOrders => {
        this.PendientOrders=filteredOrders.length
      });
      this.OrdersService.GetEarnings().subscribe({
        next:(earn)=>{
          this.Earnings=earn.length===0?0:earn[0].TotalEarnings
        }
      })
      this.productService.GetTotalStock().subscribe({
        next:(Total)=>{
          this.NumStock=Total.TotalStock?Total.TotalStock:0
        }
      })
      this.userService.GetTotalUser().subscribe({
        next:(response)=>{
          this.NumUsers=response.TotalUsers
        }
      })
  }
  async GetchartData(){
    await this.OrdersService.GetChartsData().subscribe({
      next:(info)=>{
        info.salesStats.forEach((stats)=>{
          const month=this.MonthMap.get(stats.month) ?? 'Mes Desconocido'
          this.monthsChart.push(...[month]);
          const value=stats.totalSales[0]?stats.totalSales[0].totalSales:0
          this.salesDataCharts.push(value)
        })
        info.userStats.forEach((Userstats)=>{
          const value=Userstats.totalUsers[0]?Userstats.totalUsers[0].totalUsers:0
          this.userDataChart.push(value)
        })

        this.initChart();
      }
    })
  }
  MonthMap:Map<number,string>=new Map([
    [1, 'Enero'],
    [2, 'Febrero'],
    [3, 'Marzo'],
    [4, 'Abril'],
    [5, 'Mayo'],
    [6, 'Junio'],
    [7, 'Julio'],
    [8, 'Agosto'],
    [9, 'Septiembre'],
    [10, 'Octubre'],
    [11, 'Noviembre'],
    [12, 'Diciembre'],
  ])
  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }
}


