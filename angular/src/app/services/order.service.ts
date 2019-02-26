import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'environments/environment';

import { map, catchError } from 'rxjs/operators';
import {throwError as observableThrowError,  Observable } from 'rxjs';

import { IOrder , IOrderResponse} from "@/model";
import { CachingServiceBase } from "./caching.service";

@Injectable()
export class OrderDataService extends CachingServiceBase {
  private orders: Observable<IOrder[]>;

  baseUrl: string = '/api/orders';

  public constructor(private http: HttpClient) {
    super();
  }

  public all(): Observable<IOrder[]> {
    return this.cache<IOrder[]>(() =>
      this.orders, (val: Observable<IOrder[]>) =>
        this.orders = val, () =>
        this.http
          .get<IOrder[]>(environment.baseUrl + this.baseUrl)
          .pipe(map((orders: IOrder[]) => {
            return orders;
          }),
          catchError(this.handleError)));

  }

  public getOrder(id: string): Observable<IOrder> {
    //console.log('In order service, id is ' + id);
    return this.http.get<IOrder>(environment.baseUrl + this.baseUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }

  public insertOrder(order: IOrder) : Observable<IOrder> {
    return this.http.post<IOrderResponse>(environment.baseUrl + this.baseUrl, order)
               .pipe( map((data) => {
                   //console.log('insertOrder status: ' + data.status);
                   return data.order;
               }),
               catchError(this.handleError));
  }

  public updateOrder(order: IOrder) : Observable<IOrder> {
    return this.http.put<IOrderResponse>(environment.baseUrl + this.baseUrl + '/' + order._id, order) 
               .pipe( map((data) => {
                   //console.log('updateOrder status: ' + data.status);
                   return data.order;
               }),
               catchError(this.handleError));
  }

  public deleteOrder(id: string) : Observable<boolean> {
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