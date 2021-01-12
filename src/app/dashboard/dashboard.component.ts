import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Project } from '../user';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  projectadd: FormGroup;
  passwordValidator: any;
  projects: Project;
  projectList: Project[];
  submitted = false;
  public input: any;
  datas: any;
  project = "";
  aa: boolean = false;
  displayedColumns = ['Name', 'Description'];
  constructor(private http: HttpClient, config: NgbModalConfig, private modalService: NgbModal, private formBuilder: FormBuilder, private router: Router, private loginService: AuthService, private cookieService: CookieService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  user_name = localStorage.getItem('email');
  role = this.cookieService.get("role")
  ngOnInit() {
    console.log("login details")
    this.projects = {
      name: '',
      description: '',
    }
    this.initForm(this.projects);
    this.loadData();
  }
  setIndex(ii) {
    this.aa = ii;
    console.log
  }
  key: string = 'name'; 
   
  Sorting: boolean = false;
  sort(key){
    this.key = key;
    this.Sorting = !this.Sorting;
  }
  
  loadData() {
    // if(this.role=='admin')
    // {
    this.http.get('http://localhost:5000/projectview').subscribe(result => {
      this.input = result as Project[];
      of(this.input).pipe(delay(1))
        .subscribe(data => {
          this.datas = data as Project[];
          this.projectList = this.datas;
          console.log(this.datas);
        }, error => console.log("data"));
    });
  }
  // if(this.role=='user')
  //   {
  // }
  // }
  initForm(project: Project) {
    this.projectadd = this.formBuilder.group({
      name: [project.name, Validators.required],
      description: [project.description, Validators.required]
    });
  }
  get f() { return this.projectadd.controls; }
  getLoginDetails() {
    console.log(this.projectadd.value);
    return this.projectadd.value;
  }
  login() {
    if (this.projectadd.valid) {
      console.log(this.projectadd.value.name);
      console.log(this.projectadd.value.description);
    }
  }
  open(content) {
    this.modalService.open(content);
  }
  saveProject(projectParam: Project) {
    if (this.projectadd.valid) {
      this.submitted = true;
      this.loginService.doProject(projectParam)
        .subscribe(res => {
          console.log(res);
          this.loadData();
        }, error => {
          if (error.status = 401) {
            console.log("Error in fetch service");
          }
          else if (error.status = 400) {
            console.log("400 error ");
          }
          
        }
        );
    }
    else if (this.projectadd.invalid) {
      this.submitted = true;
      return;
    }
  }
  deleteAll() {
    this.http.get('http://localhost:5000/logout').subscribe(result => {
      this.cookieService.deleteAll('token');
      this.router.navigate(['/login']);
    }, error => console.log("data"));
  }
  
}

