import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";

import { UserService, CustomerDataService } from '@/services';
import { MUser, ICustomer } from '@/model';

@Injectable()
export class UserResolver implements Resolve<MUser> {

  constructor(private userService: UserService, private router: Router, private customerService: CustomerDataService) { }

  resolve(route: ActivatedRouteSnapshot): Promise<MUser> {

    let user = new MUser();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
        .then(res => {
          user.email = res.email;
          user.uid = res.uid;
          this.customerService.getCustomerByAuth(user.uid)
            .subscribe((customer: ICustomer) => {
              user.customer = customer;
            }, (err: any) => { console.log(err) },
              () => {
                return resolve(user);
              }
            );
        }).catch((res) => {
          return resolve(null);
        });
    })
  }
}
