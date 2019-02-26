import { Component, OnInit, Input } from '@angular/core';

import { CheckoutFormDataService } from '@/services';

@Component({
    selector: 'checkout-steps'
    , templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss',
        './checkout.scss']
})

export class CheckoutComponent implements OnInit {
    @Input() formData;


    constructor(private formDataService: CheckoutFormDataService) {
    }

    public ngOnInit(): void {
        this.formData = this.formDataService.getCheckoutFormData();
    }

}