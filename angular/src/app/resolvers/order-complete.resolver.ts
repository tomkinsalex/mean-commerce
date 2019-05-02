import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";

import { CheckoutFormDataService, CartService, AuthService } from '@/services';
import { MOrderInfo, MCustomer, IOrderReview, Role } from '@/model';

@Injectable()
export class OrderCompleteResolver implements Resolve<IOrderReview> {

  constructor(private router: Router, 
    private checkoutService: CheckoutFormDataService,
    private cartService: CartService,
    private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot): Promise<IOrderReview> {
    return new Promise((resolve, reject) => {
      const cust: MCustomer = this.checkoutService.getCustomer();
      const info: MOrderInfo = this.checkoutService.getOrderInfo();
      this.checkoutService.resetCheckoutFormData();
      this.cartService.empty();
      if(cust.user.role === Role.GUEST){
        this.authService.logout();
      }
      resolve({customer: cust, orderInfo: info});
    })

  }
}
