import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from "moment";
import * as jwt_decode from "jwt-decode";

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

  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
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
    return null;
  }

  public register(user: IUser): Observable<IAuthResponse> {
    return this.userService.register(user)
      .pipe(map((resp: IAuthResponse) => {
        if (resp.status) {
          this.setSession(resp);
        }
        return resp;
      }));
  }

  public login(user: IUser): Observable<IAuthResponse> {
    return this.userService.login(user)
      .pipe(map((resp: IAuthResponse) => {
        if (resp.status) {
          this.setSession(resp);
        }
        return resp;
      }));
  }

  private setSession(authResult: IAuthResponse): void {

    let tokenInfo = this.getDecodedAccessToken(authResult.token);

    const d = new Date(0);
    d.setUTCSeconds(tokenInfo.exp);
    const expiresAt = moment(d);

    localStorage.setItem(this.LS_TOKEN, authResult.token);
    localStorage.setItem(this.LS_EXPIRES, JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem(this.LS_USER, tokenInfo.id);
  }

  public logout(): void {
    localStorage.removeItem(this.LS_TOKEN);
    localStorage.removeItem(this.LS_EXPIRES);
    localStorage.removeItem(this.LS_USER);
  }

  public isLoggedIn(): boolean {
    let mom = this.getExpiration();
    if (mom) {
      return moment().isBefore(mom);
    }
    this.logout();
    return false;
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  private getExpiration() {
    const expiration = localStorage.getItem(this.LS_EXPIRES);
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return null;
  }

}
