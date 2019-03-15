import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'environments/environment';

import { map, catchError } from 'rxjs/operators';
import { throwError as observableThrowError, Observable } from 'rxjs';

import { IShipment, IShipmentResponse } from "@/model";

@Injectable()
export class ShipmentDataService {

  baseUrl: string = '/api/shipments';

  public constructor(private http: HttpClient) {}

  public all(): Observable<IShipment[]> {
    return this.http
          .get<IShipment[]>(environment.baseUrl + this.baseUrl)
          .pipe(map((shipments: IShipment[]) => {
            return shipments;
          }),
            catchError(this.handleError));

  }

  public getShipment(id: string): Observable<IShipment> {
    //console.log('In shipment service, id is ' + id);
    return this.http.get<IShipment>(environment.baseUrl + this.baseUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }

  public insertShipment(shipment: IShipment): Observable<IShipment> {
    return this.http.post<IShipmentResponse>(environment.baseUrl + this.baseUrl, shipment)
      .pipe(map((data) => {
        //console.log('insertShipment status: ' + data.status);
        return data.shipment;
      }),
        catchError(this.handleError));
  }

  public updateShipment(shipment: IShipment): Observable<IShipment> {
    return this.http.put<IShipmentResponse>(environment.baseUrl + this.baseUrl + '/' + shipment._id, shipment)
      .pipe(map((data) => {
        //console.log('updateShipment status: ' + data.status);
        return data.shipment;
      }),
        catchError(this.handleError));
  }

  public deleteShipment(id: string): Observable<boolean> {
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