import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { CartService, CheckoutFormDataService } from '@/services';
import { MOrderInfo } from '@/model';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss',
    '../checkout.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  public title = 'Your Order has Completed';
  public orderInfo: MOrderInfo;
  public canNavigate: boolean = false;

  constructor(private formDataService: CheckoutFormDataService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.orderInfo = this.formDataService.getOrderInfo();
  }

  navigateAway() {
    this.canNavigate = true;
    this.router.navigateByUrl('store/main');
  }

  canDeactivate(): boolean {
    if (this.canNavigate) {
      return true;
    }
    this.snackBar.open('Order Completed, you may not return to checkout flow', '', {
      duration: 3000
    });
    return false;
  }


  ngOnDestroy() {
    this.formDataService.resetCheckoutFormData();
    this.cartService.empty();
  }
}
