import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../Models/user';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Login: FormGroup;
  passwordValidator: any;
  loggedIn: User;
  submitted = false;
  cookieValue: string;
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: AuthService, private cookieService: CookieService) { }
  ngOnInit() {
    console.log("login details")
    this.loggedIn = {
      email: '',
      password: ''
    }
    this.initForm(this.loggedIn);
  }
  initForm(login: User) {
    this.Login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [login.password, [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.Login.controls; }
  LoginDetails() {
    console.log(this.Login.value);
    return this.Login.value;
  }
  login() {
    if (this.Login.valid) {
      console.log(this.Login.value.email);
      console.log(this.Login.value.password);
    }
  }
  loggin(loggin: User) {
    this.submitted = true;
    if (this.Login.invalid) {
      return;
    }
    else if (this.Login.valid) {
      
      this.submitted = true;
      this.loginService.doLogin(loggin)
        .subscribe(res => {
          console.log(res)
          localStorage.setItem("email", this.Login.value.email)
          console.log(localStorage.getItem("email"), 'login');
          this.cookieService.set("token", res['token']);
          // this.cookieService.set("role", res['role']);
          console.log(res);
          if (this.cookieService.get("role") == 'user') {
            this.router.navigate(['/task']);
          }
          else {
            this.router.navigate(['/dashboard']);
          }
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
}


