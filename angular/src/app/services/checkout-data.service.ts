import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';

import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

import {
    MCheckoutFormData, MCustomer, MPaymentInfo, MOrderInfo, MCheckoutSteps,
    IOrder, ICustomer, IOrderItem, IUser
} from '@/model';
import { CheckoutFlowService } from './checkout-flow.service';
import { OrderDataService } from './order.service';
import { ShipmentDataService } from './shipment.service';
import { OrderItemDataService } from './orderitem.service';
import { PaymentDataService } from './payment.service';
import { CustomerDataService } from './customer.service';

@Injectable()
export class CheckoutFormDataService {

    private formData: MCheckoutFormData;
    private isCustomerFormValid: boolean;
    private isPaymentFormValid: boolean;
    private isConfirmationFormValid: boolean;

    constructor(private checkoutflowService: CheckoutFlowService,
        private orderDataService: OrderDataService,
        private orderitemDataService: OrderItemDataService,
        private shipmentDataService: ShipmentDataService,
        private paymentDataService: PaymentDataService,
        private customerDataService: CustomerDataService,
    ) {
        this.isCustomerFormValid = false;
        this.isPaymentFormValid = false;
        this.isCustomerFormValid = false;
        this.formData = new MCheckoutFormData();
        if(!environment.production){
            this.formData.test();
        }
    }

    public getCustomer(): MCustomer {
        return this.formData.customer;
    }

    public setUser(data: IUser): void {
        this.formData.customer.user = data;
    }

    public setExistingCustomer(data: ICustomer): void {
        this.formData.customer.id = data._id;
        this.formData.customer.phoneNumber = data.phone_number;
        this.formData.customer.address.street = data.address;
        this.formData.customer.address.city = data.city;
        this.formData.customer.address.country = data.country;
        this.formData.customer.address.state = data.state;
        this.formData.customer.address.zip = data.zip_code;
    }

    public setCustomer(data: MCustomer): void {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.isCustomerFormValid = true;
        this.formData.customer = data;
        // Validate Personal Step in CheckoutFlow
        this.checkoutflowService.validateStep(MCheckoutSteps[1].step);
    }

    public getOrderInfo(): MOrderInfo {
        return this.formData.orderInfo;
    }

    public setOrderInfo(data: MOrderInfo): void {
        // Update the work type only when the Work Form had been validated successfully
        this.isConfirmationFormValid = true;
        this.formData.orderInfo = data;
        // Validate Work Step in CheckoutFlow
        this.checkoutflowService.validateStep(MCheckoutSteps[0].step);
    }

    public getPaymentInfo(): MPaymentInfo {
        return this.formData.paymentInfo;
    }

    public setPaymentInfo(data: MPaymentInfo): void {
        // Update the Address data only when the Address Form had been validated successfully
        this.isPaymentFormValid = true;
        this.formData.paymentInfo = data;
        // Validate Address Step in CheckoutFlow
        this.checkoutflowService.validateStep(MCheckoutSteps[2].step);
    }

    public setPaymentAddress(): void {
        this.formData.paymentInfo.billingAddress = this.formData.customer.address;
    }

    public getCheckoutFormData(): MCheckoutFormData {
        // Return the entire Form Data
        return this.formData;
    }

    public resetCheckoutFormData(): MCheckoutFormData {
        // Reset the checkoutflow
        this.checkoutflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        this.isCustomerFormValid = this.isPaymentFormValid = this.isConfirmationFormValid = false;
        return this.formData;
    }

    public isFormValid(): boolean {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isCustomerFormValid &&
            this.isPaymentFormValid &&
            this.isConfirmationFormValid;
    }
    public formNotValid(): void {
        this.isCustomerFormValid = this.isPaymentFormValid = this.isConfirmationFormValid = false;
    }

    public submitOrder(): Observable<any> {
        this.formData.orderInfo.calculateTotal();
        return this.sendOrderToDb();
        // Send email feature to be added
    }

    private sendOrderItemsToDb(order: IOrder): Observable<IOrderItem>[] {
        return this.formData.orderInfo.cartItems.map((orderItem) => {
            //console.log(orderItem);
            return this.orderitemDataService.insertOrderItem({
                item: { _id: orderItem.id },
                order: { _id: order._id },
                price: orderItem.price
            });
        });
    }

    private sendOrderToDb(): Observable<any> {
        if(this.formData.customer.id){
            return this.existingCustomerSend();
        }
        return this.noCustomerSend();
    }

    private noCustomerSend(): Observable<any> {
        return this.customerDataService.insertCustomer({
            user: { _id: this.formData.customer.user._id },
            phone_number: this.formData.customer.phoneNumber,
            address: this.formData.customer.address.street,
            city: this.formData.customer.address.city,
            state: this.formData.customer.address.state,
            zip_code: this.formData.customer.address.zip,
            country: this.formData.customer.address.country
        }).pipe(
            tap((customer: ICustomer) => {
                this.orderDataService.insertOrder(
                    {
                        customer: { _id: customer._id },
                        status: 'Processed',
                        sub_total: this.formData.orderInfo.sub_total,
                        shipping_cost: this.formData.orderInfo.deliveryOption.price,
                        total: this.formData.orderInfo.total,
                        invoice_number: 10
                    }
                ).pipe(
                    tap((order: IOrderItem) => {
                        this.paymentDataService.insertPayment({
                            order: { _id: order._id },
                            host_charge_id: 'Get this from some Stripe type service if payment passes',
                            amount: this.formData.orderInfo.total
                        }).subscribe();
                        this.shipmentDataService.insertShipment({
                            order: { _id: order._id },
                            courrier_option: this.formData.orderInfo.deliveryOption.name
                        }).subscribe();
                        this.sendOrderItemsToDb(order).map((obs: Observable<IOrderItem>) => {
                            obs.subscribe();
                        });
                    })
                ).subscribe();
            })
        );
    }

    private existingCustomerSend(): Observable<any> {
        return this.customerDataService.updateCustomer({
            _id: this.formData.customer.id,
            phone_number: this.formData.customer.phoneNumber,
            address: this.formData.customer.address.street,
            city: this.formData.customer.address.city,
            state: this.formData.customer.address.state,
            zip_code: this.formData.customer.address.zip,
            country: this.formData.customer.address.country
        }).pipe(
            tap((customer: ICustomer) => {
                this.orderDataService.insertOrder(
                    {
                        customer: { _id: customer._id },
                        status: 'Processed',
                        sub_total: this.formData.orderInfo.sub_total,
                        shipping_cost: this.formData.orderInfo.deliveryOption.price,
                        total: this.formData.orderInfo.total,
                        invoice_number: 10
                    }
                ).pipe(
                    tap((order: IOrderItem) => {
                        this.paymentDataService.insertPayment({
                            order: { _id: order._id },
                            host_charge_id: 'Get this from some Stripe type service if payment passes',
                            amount: this.formData.orderInfo.total
                        }).subscribe();
                        this.shipmentDataService.insertShipment({
                            order: { _id: order._id },
                            courrier_option: this.formData.orderInfo.deliveryOption.name
                        }).subscribe();
                        this.sendOrderItemsToDb(order).map((obs: Observable<IOrderItem>) => {
                            obs.subscribe();
                        });
                    })
                ).subscribe();
            })
        );
    }
}