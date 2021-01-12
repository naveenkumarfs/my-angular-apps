import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Register, RoleType, User } from '../Models/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  [x: string]: any;
  Task: FormGroup;
  passwordValidator: any;

  model = new Register();
  keys = Object.keys;
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: AuthService) { }
  ngOnInit() {
    console.log("login details")
    this.loggedIn = {
      username: '',
      email: '',
      password: ''
    }
    this.initForm(this.loggedIn);
    console.log(this.Task.value.username)
  }
  select(data)
{
    this.model.role=data;
}
  initForm(login: Register) {
    this.Task = this.formBuilder.group({
      username: [login.username, Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [login.password, [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.Task.controls; }
  getLoginDetails() {
    console.log(this.Task.value);
    return this.Task.value;
  }
  login() {
    if (this.Login.invalid) {
      return;
      console.log(this.Task.value.username);
      console.log(this.Task.value.email);
      console.log(this.Task.value.password);
    }
  }
  loggin(loggin: Register) {
    this.submitted = true;
    console.log(this.Task.value.username);
    this.loginService.doRegister(loggin)
      .subscribe(res => {
        console.log(res)
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
}
