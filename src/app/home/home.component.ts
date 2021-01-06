import { Component, OnInit, ViewChild, HostListener,TemplateRef } from '@angular/core'; 
import { ServicesService } from '../services.service';
import { Router } from '@angular/router'; 
 
@Component({
  selector: 'wsa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
  dataList:any=[];
  project:any;
  department:any;
  s_dept:any;
  s_project:any;
     constructor(private service: ServicesService, private route: Router) { 
    }
  
    ngOnInit(): void {
      this.jobList();
      this.viewProject();
      this.viewDept();
    }


      viewProject(){
        this.service.Post('auth/viewProject',{}).then((res:any)=>{
          if(res.status == 200)
            this.project = res.result;
            console.log(this.project);
        })
      }

        viewDept(){
          this.service.Post('auth/viewdepartment',{}).then((res:any)=>{
            if(res.status == 200)
              this.department = res.result;
              console.log(this.department);
          })
        }

        submitView(){
          this.jobList();
        }

    jobList(){
      let data=[{
        department:this.s_dept,
        project:this.s_project
      }];
      this.service.Post('auth/viewJob',data).then((res:any)=>{
        if(res.status == 200){
          this.dataList = res.result;
        }else{
         this.service.showtoaster('Data not found...','Home','error');}
      })
    }

    movePage(){
      this.route.navigateByUrl('department');
    }
  
    // logout() {
    //   // this.service.loader.stop();
    //   this.service.Get('/logout').then((data:any) => { 
    //     console.log(data);
    //     if(data.status == 200){
    //       localStorage.storage.clear().subscribe(()=>{
    //         this.route.navigate(['login']);  
    //       });
    //     }
    //     },
    //     error => {
    //     // this.service.loader.stop();
    //       console.log(error);
    //     });
    // }
  
  
   
  
  }
  
