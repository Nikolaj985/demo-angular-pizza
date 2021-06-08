import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptorService implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    private loader: LoaderService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loader.setLoading(true, req.url);
    const authorization = 'Bearer ' + this.loginService.getToken();
    const authReq = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: authorization,
      }),
    });
    const putHeader = req.clone({
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: authorization,
      }),
    });

    if (req.method == 'POST' && req.url.match('/auth')) {
      return next.handle(putHeader);
    }
    return next.handle(authReq);
  }
}
