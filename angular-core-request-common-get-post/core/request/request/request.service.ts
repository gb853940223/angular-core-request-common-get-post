import { Injectable, Inject } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL_TOKEN } from '../request.token';

@Injectable({
  providedIn: 'root'
})
export class RequestService implements HttpInterceptor {

  constructor(
    @Inject(API_URL_TOKEN) public apiUrl: string,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = '';
    const reqUrl = req['url'];
    const http_reg = /http(s?):\/\//ig;
    const hasHttp = http_reg.test(reqUrl);
    if (hasHttp) {
      url = reqUrl;
    } else {
      url = this.apiUrl + reqUrl;
    }
    const req_clong = req.clone({
      url: url
    });
    return next.handle(req_clong);
  }
}
