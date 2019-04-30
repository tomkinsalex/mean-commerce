import { Component, OnInit, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { CartService } from '@/services';
import { ICartItem, ICart } from '@/model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements OnInit {
  @Input() data;

  public cart: Observable<ICart>;
  public cartItems: ICartItem[];
  public displayedColumns: string[] = ['title', 'quantity', 'remove'];
  public itemCount: number = 0;
  public showCartButtons: boolean;

  private cartSubscription: Subscription;

  constructor(private cartService: CartService, private snackBar: MatSnackBar, private router: Router) { }

  public ngOnInit(): void {
    this.showCartButtons = this.data;
    this.cart = this.cartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.itemCount;
      this.cartItems = cart.items;
    });
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  public removeItemFromCart(item: ICartItem): void {
    this.cartService.removeItem(item);
    if (this.itemCount === 0) {
      this.router.navigate(['']);
      this.snackBar.open('No more items remaining in your Cart', '', {
        duration: 3000
      });
    } else {
      this.snackBar.open('Item removed from your cart.', '', {
        duration: 3000
      });
    }
  }

  public quantityChange(item: ICartItem, amount: number): void {
    this.cartService.changeItemQuantity(item, amount);
  }

  public emptyCart(): void {
    this.cartService.empty();
  }
}
