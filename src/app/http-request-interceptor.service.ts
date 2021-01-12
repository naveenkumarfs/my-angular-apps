import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // console.log("interceptor: " + req.url);
    req = req.clone({
      // headers:req.headers.set('Authorization','headers')
      withCredentials: true
    });
    return next.handle(req);
  }
}


