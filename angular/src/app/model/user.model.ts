import { ICustomer } from './interfaces';

export class MUser {
  email: string;
  uid: string;
  customer: ICustomer;
  role: Role;

  constructor(){
    this.email = '';
    this.uid = '';
    this.customer = null;
    this.role = Role.User;
  }
}

export enum Role {
  User = 'User',
  Admin = 'Admin'
}
