import { IDeliveryOption} from "./interfaces";
import { MCartItem } from "./cart-item.model";

export class MCheckoutFormData {
    customer: MCustomer ;
    paymentInfo: MPaymentInfo ;
    orderInfo: MOrderInfo ;
    
    constructor(){
        this.customer = new MCustomer();
        this.paymentInfo = new MPaymentInfo();
        this.orderInfo = new MOrderInfo();
    }

    test(): void{
        this.customer.test();
        this.paymentInfo.test();
        this.orderInfo.test();
    }

    clear() {
        this.customer = new MCustomer();
        this.paymentInfo = new MPaymentInfo();
        this.orderInfo = new MOrderInfo();
        
    }
}

export class MCustomer {
    firstName: string;
    lastName : string;
    email: string;
    phoneNumber: string;
    address: MAddress;

    constructor(){
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phoneNumber = '';
        this.address = new MAddress();
    }

    test(): void{
        this.firstName = 'John';
        this.lastName = 'Smith';
        this.email = 'email@email.com';
        this.phoneNumber = '613-456-7898';
        this.address.test();
    }
}

export class MAddress {
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
    country: string = '';

    constructor(){
    this.street= '';
    this.city= '';
    this.state= '';
    this.zip= '';
    this.country= '';
    }

    //testing
    test(): void{
        this.street= 'Street';
        this.city= 'City';
        this.state= 'ST';
        this.zip= '56265';
        this.country= 'US';
        }
}

export class MPaymentInfo {
    nameOnCard: string ;
    creditCard: number;
    cvc: number ;
    expiryMonth: number ;
    expiryYear: number ;
    billingAddress: MAddress ;

    constructor(){
        this.nameOnCard = '';
        this.creditCard = null;
        this.cvc = null;
        this.expiryMonth = null;
        this.expiryYear = null;
        this.billingAddress = new MAddress();
    }

    test(): void{
        this.nameOnCard = 'John Doe';
        this.creditCard = 1000;
        this.cvc = 111;
        this.expiryMonth = 10;
        this.expiryYear = 10;
        this.billingAddress.test();

    }
}

export class MOrderInfo {
    deliveryOption: IDeliveryOption;
    orderItems: MOrderItem[];
    sub_total: number;
    total: number;

    constructor() {
        this.deliveryOption = {
            id: '',
            name: '',
            description: '',
            price: 0
        };
        this.orderItems = [new MOrderItem()];
    }

    //testing
    test(): void {
        this.deliveryOption = {
            id: "c7f6535c-c56b-4e57-94dc-0e95b936b00b",
            name: "Express",
            description: "The quickest of the normal delivery service",
            price: 9.99
          };
        this.total = 0;
        this.sub_total = 0;
        this.orderItems = [new MOrderItem()];
    }

    public calculateTotals(): void {
        this.sub_total = 0;
        this.orderItems.map( orderItem => {
            this.sub_total += orderItem.cartItem.price * orderItem.cartItem.quantity;
        });
        this.total = this.sub_total + this.deliveryOption.price;
    }
}

export class MOrderItem {
    cartItem: MCartItem = new MCartItem();
    maxQuantity: number = 0;
}