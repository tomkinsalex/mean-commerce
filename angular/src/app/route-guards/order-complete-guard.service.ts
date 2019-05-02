import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CanActivate, Router } from '@angular/router';
import { CheckoutFormDataService } from '@/services';

@Injectable()
export class OrderCompleteRouteGuard implements CanActivate {

    constructor(private router: Router,
        private snackBar: MatSnackBar,
        private checkoutDataService: CheckoutFormDataService) { }

    canActivate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!this.checkoutDataService.isFormValid()) {
                this.handleError();
                resolve(false);
            }
            this.checkoutDataService.submitOrder()
                .subscribe(() => {
                },
                    (err: any) => {
                        this.handleError();
                        return false;
                    },
                    () => {
                        this.checkoutDataService.formNotValid();
                        this.snackBar.open('Order Succesfully placed :)', '', {
                            duration: 2000
                          });
                        resolve(true);
                    }
                )
        });
    }

    private handleError(): void {
        this.router.navigate(['checkout/confirmation']);
        this.snackBar.open('An error has occurred, please try again', '', {
            duration: 2000
        });
    }
}


