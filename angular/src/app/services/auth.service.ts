import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from "moment";

import { IAuthResponse, IUser } from '@/model';
import { UserService } from '@/services/user.service';

@Injectable()
export class AuthService {

  private LS_EXPIRES: string = "expires_at";
  private LS_TOKEN: string = "token_id";
  private LS_USER: string = "user_id";


  constructor(private userService: UserService) { }

  public getToken(): string {
    return localStorage.getItem(this.LS_TOKEN);
  }

  public getCurrentUser(): Observable<IUser> {
    let user: string = localStorage.getItem(this.LS_USER);

    if (typeof user === 'undefined' || user == null || user === null) {
      return null;
    }

    if (this.isLoggedIn()) {
      return this.userService.getUser(user);
    } else {
      this.logout();
    }
  }

  register(user: IUser): Observable<IAuthResponse> {
    return this.userService.register(user)
      .pipe(map((resp: IAuthResponse) => {
        if (resp.status) {
          this.setSession(resp);
        }
        return resp;
      }));
  }

  login(user: IUser): Observable<IAuthResponse> {
    return this.userService.login(user)
      .pipe(map((resp: IAuthResponse) => {
        if (resp.status) {
          this.setSession(resp);
        }
        return resp;
      }));
  }

  private setSession(authResult: IAuthResponse): void {
    const expiresAt = moment().add(authResult.expires, 'second');

    localStorage.setItem(this.LS_TOKEN, authResult.token);
    localStorage.setItem(this.LS_EXPIRES, JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem(this.LS_USER, authResult.user_id);
  }

  logout(): void {
    localStorage.removeItem(this.LS_TOKEN);
    localStorage.removeItem(this.LS_EXPIRES);
    localStorage.removeItem(this.LS_USER);
  }

  public isLoggedIn(): boolean {
    //return moment().isBefore(this.getExpiration());
    return true;
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  private getExpiration() {
    const expiration = localStorage.getItem(this.LS_EXPIRES);
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}
