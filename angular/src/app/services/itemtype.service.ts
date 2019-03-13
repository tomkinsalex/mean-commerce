import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'environments/environment';

import { map, catchError } from 'rxjs/operators';
import { throwError as observableThrowError, Observable } from 'rxjs';

import { IItemType, IItemTypeResponse } from "@/model";

@Injectable()
export class ItemTypeDataService {

  baseUrl: string = '/api/itemtypes';

  public constructor(private http: HttpClient) {}

  public all(): Observable<IItemType[]> {
    return this.http
          .get<IItemType[]>(environment.baseUrl + this.baseUrl)
          .pipe(
            map((itemtypes: IItemType[]) => {
              return itemtypes;
            }),
            catchError(this.handleError));

  }

  public getItemType(id: string): Observable<IItemType> {
    //console.log('In itemtype service, id is ' + id);
    return this.http.get<IItemType>(environment.baseUrl + this.baseUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }

  public insertItemType(itemtype: IItemType): Observable<IItemType> {
    return this.http.post<IItemTypeResponse>(environment.baseUrl + this.baseUrl, itemtype)
      .pipe(
        map((data) => {
          //console.log('insertItemType status: ' + data.status);
          return data.itemtype;
        }),
        catchError(this.handleError));
  }

  public updateItemType(itemtype: IItemType): Observable<IItemType> {
    return this.http.put<IItemTypeResponse>(environment.baseUrl + this.baseUrl + '/' + itemtype._id, itemtype)
      .pipe(
        map((data) => {
          //console.log('updateItemType status: ' + data.status);
          return data.itemtype;
        }),
        catchError(this.handleError));
  }

  public deleteItemType(id: string): Observable<boolean> {
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