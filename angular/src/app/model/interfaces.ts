import { ModuleWithProviders } from '@angular/core';

export interface IRouting {
    routes: ModuleWithProviders,
    components: any[]
}

export interface IItem {
    _id?: string;
    item_type?: IItemType;
    title?: string;
    name?: string;
    price?: number;
    description?: string;
    stock?: number;
}

export interface IItemResponse {
    item: IItem;
    status: boolean;
    error: string;
}

export interface IItemType {
    _id?: string;
    parent_type?: IItemType;
    name?: string;
    description?: string;
}
export interface IItemTypeResponse {
    itemtype: IItemType;
    status: boolean;
    error: string;
}

export interface IUser {
    _id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    role?: Role;
}

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    GUEST = 'GUEST'
}

export interface IAuthResponse{
    user_id: string;
    status: boolean;
    token: string;
    error: string;
    expires: number;
}

export interface ICustomer {
    _id?: string;
    user?: IUser;
    phone_number?: number;
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
    payment_host_id?: string;
}

export interface ICustomerResponse {
    customer: ICustomer;
    status: boolean;
    error: string;
}

export interface IOrder {
    _id?: string;
    customer?: ICustomer;
    status?: string;
    date_placed?: Date;
    sub_total?: number;
    shipping_cost?: number;
    total?: number;
    invoice_number?: number;
}

export interface IOrderResponse {
    order: IOrder;
    status: boolean;
    error: string;
}

export interface IOrderItem {
    _id?: string;
    item?: IItem;
    order?: IOrder;
    price?: number;
}
export interface IOrderItemResponse {
    orderitem: IOrderItem;
    status: boolean;
    error: string;
}

export interface IPayment {
    _id?: string;
    order?: IOrder;
    host_charge_id?: string;
    amount?: number;
    date?: Date;
}

export interface IPaymentResponse {
    payment: IPayment;
    status: boolean;
    error: string;
}

export interface IShipment {
    _id?: string;
    order?: IOrder;
    tracking_number?: string;
    courrier_option?: string;
    date_shipped?: Date;
}

export interface IShipmentResponse {
    shipment: IShipment;
    status: boolean;
    error: string;
}

export interface IDeliveryOption {
    id: string;
    name: string;
    description: string;
    price: number;
}