import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordPageComponent } from './pages/password-page/password-page.component';
import { UserDatasPageComponent } from './pages/user-datas-page/user-datas-page.component';

const routes: Routes = [
  {path:'',children:[
    {path:'password',component:PasswordPageComponent},
    {path:'UserDatas',component:UserDatasPageComponent},
    {path:'**',redirectTo:'UserDatas'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
