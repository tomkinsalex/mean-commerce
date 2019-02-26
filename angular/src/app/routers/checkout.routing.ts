import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutComponent, CheckoutConfirmationComponent, CheckoutCustomerComponent, CheckoutPaymentComponent, CheckoutReviewComponent, OrderComponent } from '@/components/checkout';
import { CheckoutFlowRouteGuard, CanDeactivateGuard } from '@/route-guards';


export const routes: Routes = [
    {   
        path: '', component: CheckoutComponent, children: [
            { path: '', pathMatch: 'full', redirectTo: 'confirmation' },
            { path: 'confirmation', component: CheckoutConfirmationComponent },
            { path: 'customer', component: CheckoutCustomerComponent, canActivate: [CheckoutFlowRouteGuard] },
            { path: 'payment', component: CheckoutPaymentComponent, canActivate: [CheckoutFlowRouteGuard] },
            { path: 'review', component: CheckoutReviewComponent, canActivate: [CheckoutFlowRouteGuard] },
        ]
    },
    { path: 'order', component: OrderComponent, canDeactivate: [CanDeactivateGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [CheckoutFlowRouteGuard]
  })
  export class CheckoutRoutingModule { }