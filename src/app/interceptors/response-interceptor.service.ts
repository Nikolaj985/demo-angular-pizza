import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class ResponseInterceptorService implements HttpInterceptor {
  constructor(private loader: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (evt) => {
          if (evt instanceof HttpResponse || evt instanceof HttpErrorResponse) {
            this.loader.setLoading(false, req.url);
          }
        },
        (error) => {
          this.loader.setLoading(false, req.url);
        }
      )
    );
  }
}
