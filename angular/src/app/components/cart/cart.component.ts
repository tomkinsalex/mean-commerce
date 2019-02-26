import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from "rxjs";

import { MCart, MCartItem } from "@/model";
import { CartService } from "@/services";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  public cart: Observable<MCart>;
  public cartItems: MCartItem[];
  public itemCount: number;

  private cartSubscription: Subscription;

  public constructor(
    private cartService: CartService) {
  }

  public emptyCart(): void {
    this.cartService.empty();
  }

  public removeItemFromCart(item: MCartItem): void {
    this.cartService.removeItem(item);
  }

  public ngOnInit(): void {
    this.cart = this.cartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.cartItems = cart.items;
    });
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }


}
