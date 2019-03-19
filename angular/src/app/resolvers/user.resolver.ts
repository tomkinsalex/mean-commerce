import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";

import { AuthService } from '@/services';
import { IUser } from '@/model';

@Injectable()
export class UserResolver implements Resolve<IUser> {

  constructor(private router: Router, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot): Promise<IUser> {
    let user: IUser = {};
    return new Promise((resolve, reject) => {
      let obs = this.authService.getCurrentUser();
      if (obs) {
        obs.subscribe((resp: IUser) => {
          user = resp;
        },
          (err: any) => console.log(err),
          () => {
            console.log(user + "this is the user complete");
            return resolve(user);
          })
      }else{
        console.log(user + "this is null");
        return resolve(null);
      }
    })

  }
}
