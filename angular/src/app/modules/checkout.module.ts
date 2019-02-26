import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CheckoutComponent, CheckoutConfirmationComponent, CheckoutCustomerComponent, CheckoutPaymentComponent, CheckoutReviewComponent, CheckoutNavbarComponent, OrderComponent } from '@/components/checkout';
import { CheckoutFlowService, CheckoutFormDataService } from '@/services';
import { CheckoutFlowRouteGuard, CanDeactivateGuard } from '@/route-guards';
import { CheckoutRoutingModule } from '@/routers';
import { MaterialModule } from './material.module';


@NgModule({
    imports: [CommonModule, CheckoutRoutingModule, MaterialModule, FormsModule],
    declarations: [
        CheckoutComponent, CheckoutConfirmationComponent,
        CheckoutCustomerComponent, CheckoutPaymentComponent,
        CheckoutReviewComponent, CheckoutNavbarComponent,
        OrderComponent
    ],
    providers: [
        CheckoutFlowService,
        CheckoutFormDataService,
        CheckoutFlowRouteGuard,
        CanDeactivateGuard
    ]
})
export class CheckoutModule { }