import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Register, Task, User } from './Models/user';
import { retry, catchError } from 'rxjs/operators';
import { Project } from './user';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logout() {
      throw new Error("Method not implemented.");
  }
  currentUserValue: any;
  isAuthenticated() {
    throw new Error('Method not implemented.');
  }
  private baseUrl = "http://localhost:5000";
  private header = new HttpHeaders({
    'Content-Type': 'application/json',
    
  });

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  doLogin(user: User) {
    console.log('Login api services');
    console.log(user.email);
    console.log(user.password);
    return this.http.post(this.baseUrl + '/login', JSON.stringify(user), { headers: this.header })
      .pipe(
        retry(1),
      );
  }
  doRegister(user: Register) {
    console.log('Register services');
    console.log(user);
    console.log(user.email);
    console.log(user.password);
    return this.http.post(this.baseUrl + '/register', JSON.stringify(user), { headers: this.header })
      .pipe(
        retry(1),
      );
  }
  doProject(projectadd: Project) {
    console.log('Project services');
    console.log(projectadd);
    return this.http.post(this.baseUrl + '/projectadd', JSON.stringify(projectadd), { headers: this.header },)
      .pipe(
        retry(1),
      );
  }
  dotask(Taskadd: Task) {
    console.log('Task services');
    console.log(Taskadd);
    return this.http.post(this.baseUrl + '/tasks', JSON.stringify(Taskadd), { headers: this.header },)
      .pipe(
        retry(1),
      );
  }


  // getProject(projectList:Project) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   let params = new URLSearchParams();
  //   params.append("someParamKey", projectList.name);
  //   params.append("someParamKey", projectList.description);
  //   this.http.get(this.baseUrl, { headers:headers,params })
  // }
}



