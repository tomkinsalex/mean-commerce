import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'environments/environment';

import { map, catchError } from 'rxjs/operators';
import { throwError as observableThrowError, Observable } from 'rxjs';

import { CachingServiceBase } from "./caching.service";
import { IOrderItem, IOrderItemResponse } from "@/model";

@Injectable()
export class OrderItemDataService extends CachingServiceBase {
  private orderitems: Observable<IOrderItem[]>;

  baseUrl: string = '/api/orderitems';

  public constructor(private http: HttpClient) {
    super();
  }

  public all(): Observable<IOrderItem[]> {
    return this.cache<IOrderItem[]>(() =>
      this.orderitems, (val: Observable<IOrderItem[]>) =>
        this.orderitems = val, () =>
        this.http
          .get<IOrderItem[]>(environment.baseUrl + this.baseUrl)
          .pipe(map((orderitems: IOrderItem[]) => {
            return orderitems;
          }),
            catchError(this.handleError)));

  }

  public getOrderItem(id: string): Observable<IOrderItem> {
    //console.log('In orderitem service, id is ' + id);
    return this.http.get<IOrderItem>(environment.baseUrl + this.baseUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }

  public getOrderItemsForOrder(id: string): Observable<IOrderItem[]> {
    //console.log('In orderitem service, id is ' + id);
    return this.http.get<IOrderItem[]>(environment.baseUrl + this.baseUrl + '/order/' + id)
      .pipe(map((orderitems: IOrderItem[]) => {
        return orderitems;
      }),
        catchError(this.handleError));
  }

  public insertOrderItem(orderitem: IOrderItem): Observable<IOrderItem> {
    return this.http.post<IOrderItemResponse>(environment.baseUrl + this.baseUrl, orderitem)
      .pipe(map((data) => {
        //console.log('insertOrderItem status: ' + data.status);
        return data.orderitem;
      }),
        catchError(this.handleError));
  }

  public updateOrderItem(orderitem: IOrderItem): Observable<IOrderItem> {
    return this.http.put<IOrderItemResponse>(environment.baseUrl + this.baseUrl + '/' + orderitem._id, orderitem)
      .pipe(map((data) => {
        //console.log('updateOrderItem status: ' + data.status);
        return data.orderitem;
      }),
        catchError(this.handleError));
  }

  public deleteOrderItem(id: string): Observable<boolean> {
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