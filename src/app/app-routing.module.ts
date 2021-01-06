import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { BroadcastComponent} from './login/broadcast.component'
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: BroadcastComponent
  },
  {
    path:'department',
    component:CreateDepartmentComponent
  },
  {
    path:'home',
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
