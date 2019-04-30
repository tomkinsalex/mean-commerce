import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";

import { AuthService } from '@/services';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class CheckoutGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  canActivate(): boolean {
    if (this.authService.isntExpired()) {
      return true;
    }
    this.router.navigate(['checkout/pre']);
    return false;

  }
}
