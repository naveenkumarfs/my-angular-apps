import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { projects, Task } from '../Models/user';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  Taskadd: FormGroup;
  passwordValidator: any;
  Tasks: Task;
  TaskList: Task[];
  submitted = false;
  public input: any;
  datas: any;
  displayedColumns = ['Name', 'Description'];
  id: string = this.route.snapshot.paramMap.get('id');
  private sub: any;
  Task = "";
  aa: boolean = false;
  constructor(private route: ActivatedRoute, private http: HttpClient, config: NgbModalConfig, private modalService: NgbModal, private formBuilder: FormBuilder, private router: Router, private loginService: AuthService, private cookieService: CookieService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  user_name = localStorage.getItem('email');
  role = this.cookieService.get("role")
  ngOnInit() {
    console.log(this.id);
    console.log("login details")
    this.Tasks = {
      name: '',
      description: ''
    }
    this.initForm(this.Tasks);
    this.loadData();
  }
  setIndex(ii) {
    this.aa = ii;
    console.log
  }
  key: string = 'name';

  Sorting: boolean = false;
  sort(key) {
    this.key = key;
    this.Sorting = !this.Sorting;
  }
  loadData() {
    // if(this.role=='admin')
    // {
    let token = this.cookieService.get('token');

    let httpHeaders = new HttpHeaders().set("Accept", 'application/json');
    let httpParams = new HttpParams().append('projectid', this.id);
    this.http.post('http://localhost:5000/tasksview', { "projectid": this.id }, { headers: httpHeaders }).subscribe(result => {
      this.id = this.route.snapshot.params['id'];
      this.input = result as Task[];
      of(this.input).pipe(delay(1))
        .subscribe(data => {
          this.datas = data as Task[];
          this.TaskList = this.datas;
          console.log(this.datas);
          return this.http.get(this.id)
        }, error => console.log("data"));
    });
  }
  //   if(this.role=='user')
  //     {
  //   }
  // } 
  initForm(Tasks: Task) {
    this.Taskadd = this.formBuilder.group({
      name: [Tasks.name, Validators.required],
      description: [Tasks.description],
      projectid: this.route.snapshot.params['id']
    });
  }
  get f() { return this.Taskadd.controls; }
  getLoginDetails() {
    console.log(this.Taskadd.value);
    return this.Taskadd.value;
  }
  login() {
    if (this.Taskadd.valid) {
      console.log(this.Taskadd.value.name);
      console.log(this.Taskadd.value.description);
    }
  }
  open(content) {
    this.modalService.open(content);
  }
  savetask(TaskParam: Task) {
    if (this.Taskadd.valid) {
      this.submitted = true;
      this.loginService.dotask(TaskParam)
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
    else {
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