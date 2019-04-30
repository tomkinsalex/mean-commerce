import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";

import { AuthService } from '@/services';
import { IUser, Role } from '@/model';

@Injectable()
export class UserResolver implements Resolve<IUser> {

  constructor(private router: Router, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot): Promise<IUser> {
    let user: IUser = null;
    return new Promise((resolve, reject) => {
      let obs = this.authService.getCurrentUser();
      if (obs) {
        obs.subscribe((resp: IUser) => {
          user = resp;
        },
          (err: any) => {
            this.router.navigate(['/']);
            this.authService.logout();
            return resolve(null);
          },
          () => {
            return resolve(user);
          })
      } else {
        return resolve(null);
      }
    })

  }
}
