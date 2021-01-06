import { Component, OnInit, ViewChild, HostListener, OnChanges, Input } from '@angular/core';
import { ServicesService } from '../services.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'wsa-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {
  public bsValue: any;
  public projectList: any = [];
  public DeptList: any = [];
  public userList:any = [];
  public addDept: FormGroup;
  public addproject: FormGroup;
  public addUser: FormGroup;
  public addJob: FormGroup;
  public editVal: any;
  public showtype: string;
  public submitted: boolean = true;
  public inv_check: boolean = true;
  public invigilatorList: any;
  public my_time: Date;
  public minDate = new Date();
  public profile: any;
  public switchCase:any="addJob";
  public old:any;
  
  constructor(private service: ServicesService, private formBuilder: FormBuilder, private route: Router, private activatedRoute: ActivatedRoute) {
    // if (this.editVal.edit) {
    this.addDept = this.formBuilder.group({
      department: [{ value: null, disabled: false }, [Validators.required]],
    });

    this.addproject = this.formBuilder.group({
      project: [{ value: null, disabled: false }, [Validators.required]],
    });

    this.addUser = this.formBuilder.group({
      email: [{ value: null, disabled: false }, [Validators.required]],
      name: [{ value: null, disabled: false }, [Validators.required]]
    });

    this.addJob = this.formBuilder.group({
      department: [{ value: null, disabled: false }, [Validators.required]],
      project: [{ value: null, disabled: false }, [Validators.required]],
      employee: [{ value: null, disabled: false }, [Validators.required]],
    });
  }
 

  ngOnInit(): void {
    this.fromDept();
    this.fromProject();
    this.fromUsers();
    // this.categoryList();
  }



  fromDept() {
    this.service.Post('auth/viewdepartment', {}).then((res: any) => {
      if (res.status == 200) {
        console.log(res.result);
        this.DeptList = res.result; 
      } else {
        this.service.showtoaster('Data not found...','Department','error');
      }
    })
  }

  fromProject() {
    this.service.Post('auth/viewProject', {}).then((res: any) => {
      if (res.status == 200) {
        console.log(res); 
        this.projectList = res.result;  
      } else {
        this.service.showtoaster('Data has not found...','Project','error');
      }
    })
  }

  fromUsers() {
    this.service.Post('auth/getUsers', {}).then((res: any) => {
      if (res.status == 200) {
        console.log(res); 
        this.userList = res.result; 
      } else {
        this.service.showtoaster('Data not found...','User','error');
      }
    })
  }

  // submit() {  
  //   // stop here if form is invalid
  //   if (this.createTest.value) {
  //     return;
  //   }
  // }

  addJobs(){
    if (this.addJob.invalid) {
      console.log(this.addJob);
    } else {
      let data = [{
        employee:this.addJob.value.employee,
        project:this.addJob.value.project,
        department: this.addJob.value.department,
      }];
      console.log(data);
      this.service.Post('auth/createJob', data).then((res: any) => {
        if (res.status == 200) {
          this.addJob.reset();
          this.submitted = true; 
          this.service.showtoaster('Job created...','Job assign','success');
        } else {
          this.service.showtoaster('Job create failed...','Job','error');
        }
      });
    } 
  }

  addDepts() { 
    if (this.addDept.invalid) {
      console.log(this.addDept);
    } else {
      let data = [{
        department: this.addDept.value.department,
      }];
      this.service.Post('auth/Createdepartment', data).then((res: any) => {
        if (res.status == 200) {
          this.addDept.reset();
          this.submitted = true; 
          this.service.showtoaster('Department created...','Department','success');
        } else {
          this.service.showtoaster('Department create failed...','Department','error');
        }
      });
    } 
  }

  addProjects() { 
    if (this.addproject.invalid) {
      console.log(this.addproject);
    } else {
      let data = [{
        project: this.addproject.value.project,
      }];
      this.service.Post('auth/CreateProject', data).then((res: any) => {
        if (res.status == 200) {
          this.addproject.reset();
          this.submitted = true;
          this.service.showtoaster('Project created...','Project','success');
        } else {
          this.service.showtoaster('Project create failed...','Project','error');
        }
      });
    } 
  }

  addUsers() { 
    if (this.addUser.invalid) {
      console.log(this.addUser);
    } else {
      let data = [{
        user_email: this.addUser.value.email,
        username: this.addUser.value.name,
        password:"123456"
      }];
      this.service.Post('auth/createUser', data).then((res: any) => {
        if (res.status == 200) {
          this.addUser.reset();
          this.submitted = true;
          this.service.showtoaster('User created...','Users','success');
        } else {
          this.service.showtoaster('User create failed...','Users','error');
        }
      });
    } 
  }

  get f() {
    return this.addDept.controls;
  }

  get j() {
    return this.addJob.controls;
  }

  get p() {
    return this.addproject.controls;
  }

  get u() {
    return this.addUser.controls;
  }

  tabChange(event){
    // let c_length= document.getElementById('job').classList; 
    // console.log([c_length]);
    // //.remove('active');
    // event.target.classList.toggle("active");   
    // if(this.old){
    //   this.old.classList.toggle("active");
    // }
    // this.old = event.target;  
    switch(event.target.innerText){
      case 'ADD USER':
        this.switchCase = 'addUser';
        break;
      case 'ADD DEPARTMENT':
        this.switchCase = 'addDept';
        break;
      case 'ADD PROJECT':
        this.switchCase = 'addProject';
        break;
      case 'ADD JOB':
        this.switchCase = 'addJob';
        this.fromDept();
        this.fromProject();
        this.fromUsers();
        break;
      case 'BACK':
        this.route.navigateByUrl('/home')
        break;
      default:
        this.switchCase = 'addJob';
        break;
    }
  }
}
