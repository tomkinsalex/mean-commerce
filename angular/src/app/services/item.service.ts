import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'environments/environment';

import { throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IItem, IItemResponse } from "@/model";

@Injectable()
export class ItemDataService {

  baseUrl: string = '/api/items';

  public constructor(private http: HttpClient) {}

  public all(): Observable<IItem[]> {
    return this.http
          .get<IItem[]>(environment.baseUrl + this.baseUrl)
          .pipe(map((items: IItem[]) => {
            return items;
          }),
            catchError(this.handleError));

  }

  public getItem(id: string): Observable<IItem> {
    //console.log('In item service, id is ' + id);
    return this.http.get<IItem>(environment.baseUrl + this.baseUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }

  public insertItem(item: IItem): Observable<IItem> {
    return this.http.post<IItemResponse>(environment.baseUrl + this.baseUrl, item)
      .pipe(map((data) => {
        //console.log('insertItem status: ' + data.status);
        return data.item;
      }),
        catchError(this.handleError));
  }

  public updateItem(item: IItem): Observable<IItem> {
    return this.http.put<IItemResponse>(environment.baseUrl + this.baseUrl + '/' + item._id, item)
      .pipe(map((data) => {
        //console.log('updateItem status: ' + data.status);
        return data.item;
      }),
        catchError(this.handleError));
  }

  public deleteItem(id: string): Observable<boolean> {
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