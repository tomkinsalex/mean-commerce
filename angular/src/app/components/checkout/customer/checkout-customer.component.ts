import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MCustomer } from '@/model';
import { CheckoutFormDataService } from '@/services';

@Component({
    selector: 'checkout-customer',
    templateUrl: './checkout-customer.component.html',
    styleUrls: ['./checkout-customer.component.scss',
        '../checkout.scss']
})
export class CheckoutCustomerComponent implements OnInit {
    public title = 'Customer Information';
    public form: any;
    public customer: MCustomer;

    constructor(private router: Router, private formDataService: CheckoutFormDataService) {
    }

    ngOnInit() {
        this.customer = this.formDataService.getCustomer();
    }

    public save(form: any): boolean {
        if (!form.valid) {
            return false;
        }

        this.formDataService.setCustomer(this.customer);
        return true;
    }

    public goToPrevious(form: any): void {
        if (this.save(form)) {
            // Navigate to the personal page
            this.router.navigate(['checkout/confirmation']);
        }
    }

    public goToNext(form: any): void {
        if (this.save(form)) {
            // Navigate to the work page
            this.router.navigate(['checkout/payment']);
        }
    }
}

