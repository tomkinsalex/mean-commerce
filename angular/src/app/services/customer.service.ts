import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'environments/environment';

import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { CachingServiceBase } from "./caching.service";
import { ICustomer, ICustomerResponse } from "@/model";

@Injectable()
export class CustomerDataService extends CachingServiceBase {
  private customers: Observable<ICustomer[]>;

  baseUrl: string = '/api/customers';

  public constructor(private http: HttpClient) {
    super();
  }

  public all(): Observable<ICustomer[]> {
    return this.cache<ICustomer[]>(() =>
      this.customers, (val: Observable<ICustomer[]>) =>
        this.customers = val, () =>
        this.http
          .get<ICustomer[]>(environment.baseUrl + this.baseUrl)
          .pipe( map((customers: ICustomer[]) => {
            return customers;
          }),
          catchError(this.handleError)));

  }

  public getCustomer(id: string): Observable<ICustomer> {
    //console.log('In customer service, id is ' + id);
    return this.http.get<ICustomer>(environment.baseUrl + this.baseUrl + '/' + id)
    .pipe(catchError(this.handleError));
  }

  public getCustomerByAuth(authId: string): Observable<ICustomer> {
    //console.log('In customer service, id is ' + id);
    return this.http.get<ICustomer>(environment.baseUrl + this.baseUrl + '/auth/' + authId)
    .pipe(catchError(this.handleError));
  }
  public getCustomerByEmail(email: string): Observable<ICustomer> {
    //console.log('In customer service, id is ' + email);
    return this.http.get<ICustomer>(environment.baseUrl + this.baseUrl + '/email/' + email)
    .pipe(catchError(this.handleError));
  }

  public insertCustomer(customer: ICustomer) : Observable<ICustomer> {
    return this.http.post<ICustomerResponse>(environment.baseUrl + this.baseUrl, customer)
               .pipe( map((data) => {
                   //console.log('insertCustomer status: ' + data.status);
                   return data.customer;
               }),
               catchError(this.handleError));
  }

  public updateCustomer(customer: ICustomer) : Observable<ICustomer> {
    return this.http.put<ICustomerResponse>(environment.baseUrl + this.baseUrl + '/' + customer._id, customer) 
               .pipe( map((data) => {
                   //console.log('updateCustomer status: ' + data.status);
                   return data.customer;
               }),
               catchError(this.handleError));
  }

  public deleteCustomer(id: string) : Observable<boolean> {
    return this.http.delete<boolean>(environment.baseUrl + this.baseUrl + '/' + id)
            .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error); 
    if (error.error instanceof Error) {
      let errMessage = error.error.message;
      return observableThrowError(errMessage);
      // Use the following instead if using lite-server
      //return Observable.throw(err.text() || 'backend server error');
    }
    return observableThrowError(error || 'Node.js server error');
}
}