import { Component, OnInit } from '@angular/core';
import { ServicesService} from '../services.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'wsa-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.css']
})
export class BroadcastComponent implements OnInit {
  public schedule:any;

  constructor(public service:ServicesService,public router:Router) { }

  ngOnInit() { 
  }

  login(form: NgForm){ 
    let data={
      "email":form.value.email,
      "password":form.value.password
  };
  // 
    this.service.Post('auth/userlogin',data).then((res:any)=>{  
      console.log(res);
      if(res[0].status == 200){
      localStorage.setItem('user', JSON.stringify(res[0].result));
      this.service.token = res[0].result.token;
      this.router.navigateByUrl('home');  
      }
    });
  }
}
