import { NgModule } from '@angular/core';

import { CheckoutComponent, CheckoutConfirmationComponent, CheckoutCustomerComponent, CheckoutPaymentComponent, CheckoutReviewComponent, CheckoutNavbarComponent, OrderComponent, PreCheckoutComponent } from '@/components/checkout';
import { CheckoutFlowService, CheckoutFormDataService, OrderDataService, OrderItemDataService, PaymentDataService, ShipmentDataService, DeliveryOptionsDataService } from '@/services';
import { CheckoutFlowRouteGuard, CanDeactivateGuard, CheckoutGuard } from '@/route-guards';
import { CheckoutRoutingModule } from '@/routers';
import { CustomerResolver } from '@/resolvers';
import { SharedModule } from './shared.module';


@NgModule({
    imports: [CheckoutRoutingModule, SharedModule],
    declarations: [
        CheckoutComponent, CheckoutConfirmationComponent,
        CheckoutCustomerComponent, CheckoutPaymentComponent,
        CheckoutReviewComponent, CheckoutNavbarComponent,
        OrderComponent, PreCheckoutComponent
    ],
    providers: [
        CheckoutFlowService,
        CheckoutFormDataService,
        CheckoutFlowRouteGuard,
        CanDeactivateGuard,
        CheckoutGuard,
        CustomerResolver,
        DeliveryOptionsDataService,
        OrderDataService,
        OrderItemDataService,
        PaymentDataService,
        ShipmentDataService,
    ]
})
export class CheckoutModule { }