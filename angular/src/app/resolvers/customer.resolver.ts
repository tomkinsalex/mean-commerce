import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";

import { AuthService, CustomerDataService } from '@/services';
import { IUser, ICustomer } from '@/model';

@Injectable()
export class CustomerResolver implements Resolve<ICustomer> {

  constructor(private router: Router,
    private authService: AuthService,
    private customerService: CustomerDataService) { }

  resolve(route: ActivatedRouteSnapshot): Promise<ICustomer> {
    let customer: ICustomer = null;
    let user: IUser;
    return new Promise((resolve, reject) => {
      let obs = this.authService.getCurrentUser();
      if (obs) {
        obs.subscribe((usr: IUser) => {
          user = usr;
          this.customerService.getCustomerByUser(user._id)
            .subscribe((cust: ICustomer) => {
              customer = cust;
            },
              (err: any) => {
                resolve(null)
              },
              () => {
                if(!customer){
                  customer = {
                    _id: null,
                    user: user
                  }
                }
                resolve(customer);
              })
        },
          (err: any) => {
            resolve(null)
          });
      } else {
        return resolve(null);
      }
    })

  }
}
