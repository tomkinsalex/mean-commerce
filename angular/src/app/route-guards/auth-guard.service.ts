import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";

import { AuthService } from '@/services';
import { IUser } from '@/model';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.getCurrentUser()
        .subscribe((user:IUser) => {
          if(user){
            this.router.navigate(['/user']);
            return resolve(false);
          }
        }, err => {
          return resolve(true);
        })
    })
  }
}
