import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'; 
import { ToastrService } from 'ngx-toastr';
 

const api_url="http://localhost:3000/";
// const api_url = "http://localhost/sk/admin";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  public token:any;
  constructor(private http:HttpClient,private toastr: ToastrService) { }

  public headerPost(){ 
    var headers:any = new HttpHeaders({'Content-Type':'application/json'});
      headers = headers.set('Access-Control-Allow-Origin','*')
                .set('Access-Control-Allow-Headers','*')
                .set('Authorization','Bearer ' + this.token);

    // var headers = new HttpHeaders();
    // headers.append('Access-Control-Allow-Origin','*'); 
    //    headers.append('Content-Type','application/json');
    //     headers = headers.append('Content-Type','application/x-www-form-urlencoded');
              
    return headers;
   }

  public Get(url){
    url = api_url+url;
  return new Promise((resolve,rejects)=>{
    this.http.get(url,{headers:this.headerPost()}).subscribe((res)=>{
     resolve(res);
    })
  })
  }

  public Post(url,data){
    url = api_url+url;
  return new Promise((resolve,rejects)=>{
    this.http.post(url,data,{headers:this.headerPost()}).subscribe((res)=>{
      resolve(res);
    })
  })
  }

  public showtoaster(mesg,title,type){
    if(type == 'success'){
          this.toastr.success(mesg,title);
          // {toastClass: 'tw'}
    }else if(type == 'error'){
      this.toastr.error(mesg,title);
    }else if(type == 'warn'){
      this.toastr.error(mesg,title);
    }else if(type == 'information'){
      this.toastr.info(mesg,title);
    }
  }
}
