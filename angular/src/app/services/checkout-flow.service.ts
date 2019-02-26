import { Injectable } from '@angular/core';

import { MCheckoutSteps } from '@/model';

@Injectable()
export class CheckoutFlowService {
    private checkoutflow = [
        { step: MCheckoutSteps[0].step, valid: false },
        { step: MCheckoutSteps[1].step, valid: false },
        { step: MCheckoutSteps[2].step, valid: false },
        { step: MCheckoutSteps[3].step, valid: false }
    ];
    
    public validateStep(step: string): void {
        // If the state is found, set the valid field to true 
        var found = false;
        for (var i = 0; i < this.checkoutflow.length && !found; i++) {
            if (this.checkoutflow[i].step === step) {
                found = this.checkoutflow[i].valid = true;
            }
        }
    }

    public resetSteps(): void {
        // Reset all the steps in the CheckoutFlow to be invalid
        this.checkoutflow.forEach(element => {
            element.valid = false;
        });
    }

    public getFirstInvalidStep(step: string) : string {
        // If all the previous steps are validated, return blank
        // Otherwise, return the first invalid step
        var found = false;
        var valid = true;
        var redirectToStep = '';
        for (var i = 0; i < this.checkoutflow.length && !found && valid; i++) {
            let item = this.checkoutflow[i];
            if (item.step === step) {
                found = true;
                redirectToStep = '';
            }
            else {
                valid = item.valid;
                redirectToStep = item.step
            }
        }
        return redirectToStep;
    }
}