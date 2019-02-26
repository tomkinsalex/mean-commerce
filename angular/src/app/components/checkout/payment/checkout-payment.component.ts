import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MPaymentInfo } from '@/model';
import { CheckoutFormDataService } from '@/services';

@Component({
    selector: 'checkout-payment',
    templateUrl: './checkout-payment.component.html',
    styleUrls: ['../checkout.scss']
})
export class CheckoutPaymentComponent implements OnInit {
    public title = 'Payment Information';
    public form: any;
    public difBillingAddress: boolean = false;
    public paymentInfo: MPaymentInfo;


    constructor(private router: Router, private formDataService: CheckoutFormDataService) {
    }

    ngOnInit() {
        this.paymentInfo = this.formDataService.getPaymentInfo();
    }

    public save(form: any): boolean {
        if (!form.valid) {
            return false;
        }

        this.formDataService.setPaymentInfo(this.paymentInfo);
        return true;
    }

    public goToPrevious(form: any): void {
        if (this.save(form)) {
            // Navigate to the personal page
            this.router.navigate(['checkout/customer']);
        }
    }

    public changeBillingAddress(): void {
        if (this.difBillingAddress) {
            this.difBillingAddress = false;
        } else {
            this.difBillingAddress = true;
        }
    }

    public goToNext(form: any): void {
        if (!this.difBillingAddress) {
            this.formDataService.setPaymentAddress();
        }

        if (this.save(form)) {
            // Navigate to the work page
            this.router.navigate(['checkout/review']);
        }
    }
}

