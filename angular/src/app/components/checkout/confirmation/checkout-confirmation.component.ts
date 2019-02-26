import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, Subscription } from "rxjs";

import { MOrderInfo, MOrderItem, MCartItem, IItem, IDeliveryOption, MCart } from '@/model';
import { CheckoutFormDataService, DeliveryOptionsDataService, ItemDataService, CartService } from '@/services';

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
    public cart: Observable<MCart>;
    public cartItems: MOrderItem[] = [new MOrderItem()];
    public itemCount: number;

    private products: IItem[];
    private cartSubscription: Subscription;

    constructor(private router: Router,
        private formDataService: CheckoutFormDataService,
        private productsService: ItemDataService,
        private deliveryOptionService: DeliveryOptionsDataService,
        private shoppingCartService: CartService,
        private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.orderInfo = this.formDataService.getOrderInfo();
        this.deliveryOptions = this.deliveryOptionService.all();
        this.cart = this.shoppingCartService.get();
        this.cartSubscription = this.cart.subscribe((cart) => {
            this.orderInfo.orderItems = cart.items.map((item) => {
                return {
                    cartItem: item,
                    maxQuantity: 0
                }
            });
        });
        this.productsService.all().subscribe((products) => {
            this.products = products;
            this.orderInfo.orderItems.map((item) => {
                const product = this.products.find((p) => p._id === item.cartItem.productId);
                item.maxQuantity = product.stock;
            });
        });
        this.orderInfo.calculateTotals();
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
        this.orderInfo.calculateTotals();
    }

    public updateItemQuantity(item: MCartItem, num: number): void {

        let index = this.orderInfo.orderItems.findIndex((i) => {
            return i.cartItem === item
        });
        this.orderInfo.orderItems[index].cartItem.quantity = this.orderInfo.orderItems[index].cartItem.quantity + num;
        this.orderInfo.calculateTotals();
    }

    public removeItem(item: MCartItem): void {
        this.shoppingCartService.removeItem(item);
        for (var i = 0; i < this.orderInfo.orderItems.length; i++) {
            if (this.orderInfo.orderItems[i].cartItem.productId === item.productId) {
                this.orderInfo.orderItems.splice(i, 1);
            }
        }
        if (this.orderInfo.orderItems.length === 0) {
            this.router.navigate(['']);
            this.snackBar.open('No more items remaining in your Cart', '', {
                duration: 3000
            });
        } else {
            this.snackBar.open('Item removed from your cart.', '', {
                duration: 3000
            });
            this.orderInfo.calculateTotals();
        }
    }
    ngOnDestroy(): void {
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }

    }
}
