import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MCheckoutFormData } from '@/model';
import { CheckoutFormDataService } from '@/services';

@Component({
    selector: 'checkout-review',
    templateUrl: './checkout-review.component.html',
    styleUrls: ['../checkout.scss']
})
export class CheckoutReviewComponent implements OnInit {
    public title = 'Please Review Your Order';
    @Input() formData: MCheckoutFormData;

    constructor(private formDataService: CheckoutFormDataService,
        private router: Router) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getCheckoutFormData();
    }

    public submit() {
        this.formDataService.submitOrder()
            .subscribe(() => {
            },
                (err: any) => {
                    console.log(err);
                    alert('Problem with Order, please try again');
                },
                () => {
                    this.formDataService.formNotValid();
                    this.router.navigate(['checkout/order']);
                }
            )
    }
}

