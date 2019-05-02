import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, Subscription } from "rxjs";

import { MOrderInfo, IDeliveryOption, ICart } from '@/model';
import { CheckoutFormDataService, DeliveryOptionsDataService, CartService } from '@/services';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'checkout-confirmation',
    templateUrl: './checkout-confirmation.component.html',
    styleUrls: ['./checkout-confirmation.component.scss',
        '../checkout.scss']
})

export class CheckoutConfirmationComponent implements OnInit, OnDestroy {

    public title = 'Order Confirmation';
    public orderInfo: MOrderInfo;
    public form: any;

    public deliveryOptions: Observable<IDeliveryOption[]>;
    public cart: Observable<ICart>;
    public subTotal: number;
    
    private cartSubscription: Subscription;

    constructor(private router: Router,
        private formDataService: CheckoutFormDataService,
        private deliveryOptionService: DeliveryOptionsDataService,
        private cartService: CartService,
        private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.orderInfo = this.formDataService.getOrderInfo();
        this.deliveryOptions = this.deliveryOptionService.all();
        this.cart = this.cartService.get();
        //update cart quantities
        this.cartSubscription = this.cart.subscribe((cart) => {
          this.orderInfo.cartItems = cart.items;
          this.orderInfo.sub_total = cart.total;
          this.orderInfo.calculateTotal();
        });
    }
    ngOnDestroy(): void {
        this.cartSubscription.unsubscribe();
    }

    public save(form: any): boolean {
        this.formDataService.setOrderInfo(this.orderInfo);
        return true;
    }

    public goToNext(form: any): void {
        if (this.save(form)) {
            this.router.navigate(['checkout/customer']);
        }
    }

    public setDeliveryOption(option: IDeliveryOption): void {
        this.orderInfo.deliveryOption = option;
        this.orderInfo.calculateTotal();
    }
}
