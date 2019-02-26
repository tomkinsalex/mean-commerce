import { Component, OnInit } from '@angular/core';
import { MCheckoutSteps } from '@/model';

@Component({
    selector: 'checkout-navbar',
    templateUrl: './checkout-navbar.component.html',
    styleUrls: ['./checkout-navbar.component.scss']
})

export class CheckoutNavbarComponent implements OnInit {
    steps: any[] = MCheckoutSteps;

    ngOnInit(): void {
        //throw new Error("Method not implemented.");
    }
}