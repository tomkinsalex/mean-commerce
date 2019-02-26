import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

import { Observable, Observer } from "rxjs";

import { CartService } from "@/services";

@Injectable()
export class PopulatedCartRouteGuard implements CanActivate {
  public constructor(private router: Router,
    private shoppingCartService: CartService) { }

  public canActivate(): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      const cartSubscription = this.shoppingCartService
        .get()
        .subscribe((cart) => {
          if (cart.items.length === 0) {
            observer.next(false);
            this.router.navigate(["/"]);
          } else {
            observer.next(true);
          }
        });
      return () => cartSubscription.unsubscribe();
    });
  }
}
