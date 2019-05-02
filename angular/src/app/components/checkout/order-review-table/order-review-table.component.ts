import { Component, OnInit, Input } from '@angular/core';
import { MOrderInfo, MCheckoutFormData, MCustomer } from '@/model';

export interface ICustomerElement {
  name: string;
  value: string;
}

@Component({
  selector: 'app-order-review-table',
  templateUrl: './order-review-table.component.html',
  styleUrls: ['./order-review-table.component.scss']
})
export class OrderReviewTableComponent implements OnInit {
  @Input() data;

  public orderInfo: MOrderInfo;
  public customer: MCustomer;
  public itemColumns: string[] = ['title', 'quantity', 'price'];
  public customerColumns: string[] = ['name', 'value'];
  public customerTable: ICustomerElement[];
  
  constructor() { 
    
  }

  ngOnInit() {
    this.orderInfo = this.data.orderInfo;
    this.customer = this.data.customer;

    this.customerTable = [
      { name: 'Name', value: this.customer.user.first_name + ' ' + this.customer.user.last_name },
      { name: 'Email', value: this.customer.user.email },
      { name: 'Phone Number', value: this.customer.phoneNumber },
      { name: 'Address', value: this.customer.address.street },
      { name: 'City', value: this.customer.address.city},
      { name: 'State', value: this.customer.address.state },
      { name: 'Zip', value: this.customer.address.zip },
      { name: 'Country', value: this.customer.address.country },
      { name: 'Cart', value: ''}
    ]
  }

}
