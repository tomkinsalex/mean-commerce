import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'environments/environment';

import { map, catchError } from 'rxjs/operators';
import { throwError as observableThrowError, Observable } from 'rxjs';

import { IPayment , IPaymentResponse} from "@/model";

@Injectable()
export class PaymentDataService {

  baseUrl: string = '/api/payments';

  public constructor(private http: HttpClient) {}

  public all(): Observable<IPayment[]> {
    return this.http
          .get<IPayment[]>(environment.baseUrl + this.baseUrl)
          .pipe( map((payments: IPayment[]) => {
            return payments;
          }),
          catchError(this.handleError));

  }

  public getPayment(id: string): Observable<IPayment> {
    //console.log('In payment service, id is ' + id);
    return this.http.get<IPayment>(environment.baseUrl + this.baseUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }

  public insertPayment(payment: IPayment) : Observable<IPayment> {
    return this.http.post<IPaymentResponse>(environment.baseUrl + this.baseUrl, payment)
               .pipe( map((data) => {
                   //console.log('insertPayment status: ' + data.status);
                   return data.payment;
               }),
               catchError(this.handleError));
  }

  updatePayment(payment: IPayment) : Observable<IPayment> {
    return this.http.put<IPaymentResponse>(environment.baseUrl + this.baseUrl + '/' + payment._id, payment) 
               .pipe( map((data) => {
                   //console.log('updatePayment status: ' + data.status);
                   return data.payment;
               }),
               catchError(this.handleError));
  }

  deletePayment(id: string) : Observable<boolean> {
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