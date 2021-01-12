import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HttpRequestInterceptorService } from './http-request-interceptor.service';
import { SearchPipe } from '../app/tableSearch.service';

import { OrderModule } from 'ngx-order-pipe';
import { TaskComponent } from './task/task.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SearchPipe,
    TaskComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule, NgbAlertModule, FormsModule, ReactiveFormsModule, HttpClientModule,OrderModule
  ],
  providers: [AuthService, CookieService, { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
