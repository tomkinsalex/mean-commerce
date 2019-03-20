import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { AuthService } from '@/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.authService.getToken();

    if (authToken) {

      const authReq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + authToken)
      });
     // console.log(authReq);
      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }

    return next.handle(req);


  }
}
