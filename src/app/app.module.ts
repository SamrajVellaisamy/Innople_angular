import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component'; 
import { BroadcastComponent } from './login/broadcast.component';
import { HttpClientModule } from '@angular/common/http';
import { TimeFormatPipe } from './time-format.pipe';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { HomeComponent } from './home/home.component'; 
import { Router, RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    BroadcastComponent,
    TimeFormatPipe,
    CreateProjectComponent,
    CreateDepartmentComponent,
    HomeComponent,
    CreateDepartmentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ 
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  exports:[],
  bootstrap: [
    AppComponent
  ],
  providers:[]
})
export class AppModule { }
