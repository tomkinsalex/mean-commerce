import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'environments/environment';

import { throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IUser, IAuthResponse } from "@/model";

@Injectable()
export class UserService {

  baseUrl: string = '/api/users';

  public constructor(private http: HttpClient) {}

  public login(user: IUser): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(environment.baseUrl + this.baseUrl + '/login', user)
      .pipe(map((data) => {
        //console.log('insertUser status: ' + data.status);
        return data;
      }),
        catchError(this.handleError));
  }

  public register(user: IUser): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(environment.baseUrl + this.baseUrl + '/register', user)
      .pipe(map((data) => {
        //console.log('insertUser status: ' + data.status);
        return data;
      }),
        catchError(this.handleError));
  }

  public createGuest(user: IUser): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(environment.baseUrl + this.baseUrl + '/guest', user)
      .pipe(map((data) => {
        //console.log('insertUser status: ' + data.status);
        return data;
      }),
        catchError(this.handleError));
  }

  public getUser(id: string): Observable<IUser> {
    //console.log('In user service, id is ' + id);
    return this.http.get<IUser>(environment.baseUrl + this.baseUrl + '/' + id)
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
