import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class EnsureHttpsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // clone request and replace 'http://' with 'https://' at the same time
    if( environment.production ){
      const secureReq = req.clone({
        url: req.url.replace('http://', 'https://')
      });
      return next.handle(secureReq);
    }
    return next.handle(req);
  }
}
