import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";

import { AuthService } from '@/services';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/']);
    this.snackBar.open('You are not signed in.', '', {
      duration: 2000
    });
    return false;

  }
}
