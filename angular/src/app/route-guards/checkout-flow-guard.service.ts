import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';

import { CheckoutFlowService } from '@/services';

@Injectable()
export class CheckoutFlowRouteGuard implements CanActivate {
    constructor(private router: Router, private checkoutflowService: CheckoutFlowService, private snackBar: MatSnackBar) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let path: string = route.routeConfig.path;

        return this.verifyWorkFlow(path);
    }

    verifyWorkFlow(path): boolean {
        // If any of the previous steps is invalid, go back to the first invalid step
        if (path !== 'order') {
            let firstPath = this.checkoutflowService.getFirstInvalidStep(path);
            if (firstPath.length > 0) {
                this.snackBar.open('Please fill out this step before proceeding', '', {
                    duration: 2000
                });
                let url = `checkout/${firstPath}`;
                this.router.navigate([url]);
                return false;
            }
        }
        return true;
    }
}


