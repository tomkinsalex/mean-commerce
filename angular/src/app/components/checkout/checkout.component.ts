import { Component, OnInit, Input } from '@angular/core';

import { CheckoutFormDataService } from '@/services';
import { ActivatedRoute } from '@angular/router';
import { MCheckoutFormData, IUser, ICustomer } from '@/model';

@Component({
    selector: 'checkout-steps'
    , templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss',
        './checkout.scss']
})

export class CheckoutComponent implements OnInit {
    @Input() formData: MCheckoutFormData;
    customer: ICustomer;

    constructor(
        private formDataService: CheckoutFormDataService,
        private route: ActivatedRoute) {
    }

    public ngOnInit(): void {
        this.formData = this.formDataService.getCheckoutFormData();
        this.route.data.subscribe(routeData => {
            let data = routeData['data'];
            if (data) {
              this.customer = data;
              this.formDataService.setUser(this.customer.user);
              if( this.customer._id ){
                  this.formDataService.setExistingCustomer(this.customer);
              }
            }
          })
    }

}