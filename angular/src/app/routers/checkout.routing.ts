import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutComponent, CheckoutConfirmationComponent, CheckoutCustomerComponent, CheckoutPaymentComponent, CheckoutReviewComponent, OrderComponent, PreCheckoutComponent } from '@/components/checkout';
import { CheckoutFlowRouteGuard, CanDeactivateGuard, CheckoutGuard } from '@/route-guards';
import { CustomerResolver } from '@/resolvers';


const routes: Routes = [
    {   
        path: '', component: CheckoutComponent, canActivate:[ CheckoutGuard ], 
        resolve: { data: CustomerResolver } ,children: [
            { path: '', pathMatch: 'full', redirectTo: 'confirmation' },
            { path: 'confirmation', component: CheckoutConfirmationComponent },
            { path: 'customer', component: CheckoutCustomerComponent, canActivate: [CheckoutFlowRouteGuard] },
            { path: 'payment', component: CheckoutPaymentComponent, canActivate: [CheckoutFlowRouteGuard] },
            { path: 'review', component: CheckoutReviewComponent, canActivate: [CheckoutFlowRouteGuard] },
        ]
    },
    { path: 'pre', component: PreCheckoutComponent },
    { path: 'order', component: OrderComponent, canDeactivate: [CanDeactivateGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
  })
  export class CheckoutRoutingModule { }