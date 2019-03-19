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

      // Clone the request and set the new header in one step.
      const authReq = req.clone({ setHeaders: { Authorization: authToken } });

      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }

    return next.handle(req);


  }
}
