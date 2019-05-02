import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MCheckoutFormData, IOrderReview } from '@/model';
import { CheckoutFormDataService } from '@/services';

@Component({
    selector: 'checkout-review',
    templateUrl: './checkout-review.component.html',
    styleUrls: ['../checkout.scss']
})
export class CheckoutReviewComponent implements OnInit {
    public title = 'Please Review Your Order';
    public formData: MCheckoutFormData;
    public reviewData: IOrderReview;

    constructor(private formDataService: CheckoutFormDataService,
        private router: Router) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getCheckoutFormData();
        this.reviewData = {
            customer: this.formData.customer,
            orderInfo: this.formData.orderInfo
        }
    }

    public submit() {
        this.router.navigate(['checkout/order']);
    }
}

