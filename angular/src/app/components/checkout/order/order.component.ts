import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

import { CartService, CheckoutFormDataService } from '@/services';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss',
    '../checkout.scss']
})

export class OrderComponent implements OnInit, OnDestroy {

  public title: string = 'Your Order has Completed';
  public formData: any;
  public canNavigate: boolean = false;

  constructor(private formDataService: CheckoutFormDataService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.formData = data;
      }
    })
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
