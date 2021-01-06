import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from './services.service';

@Component({
  selector: 'wsa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'wsa';
  constructor(public router:Router,private service:ServicesService){
    let users = JSON.parse(localStorage.getItem('user'));     
    if(users){
      this.service.token = users.token;    
      this.router.navigateByUrl('home');
      // this.router.navigateByUrl('department');
    } else {
      this.router.navigateByUrl('login');
    }
  }
}
