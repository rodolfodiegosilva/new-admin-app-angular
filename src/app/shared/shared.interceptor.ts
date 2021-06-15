import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class Interceptor implements HttpInterceptor {
  user: any;
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let q;
    // q = request.headers.set("Content-Type", "application/json");
    if(localStorage.getItem('adminToken') !== null){
      q = request.headers.set('Authorization',JSON.parse(localStorage.getItem('adminToken')));
    }
    const authReq = request.clone({
      headers: q
    });
    return next.handle(authReq);
  }
}
