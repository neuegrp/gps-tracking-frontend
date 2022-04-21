import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService, ILogin} from "rushapp-angular-core";
import {catchError, map} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {ICustomAuth} from "../interfaces/custom-auth.interface";

@Injectable({
  providedIn: 'root'
})
export class CustomAuthService extends AuthService{
  public override register(user: any): Observable<any> {
    return this.apiService.sendPost(this.apiService.getEndpoint('register'), user)
      .pipe(
        map((res: ICustomAuth) => this.browserLocalStorage.setItem('token', res.token)),
        catchError((error: HttpErrorResponse) => this.apiService.httpResponseErrorHandler(error))
      );
  }
  public override login(data: ILogin): Observable<any> {
    return this.apiService.sendPost(this.apiService.getEndpoint('login'), data)
      .pipe(
        map((res: ICustomAuth) => this.browserLocalStorage.setItem('token', res.token)),
        catchError((error: HttpErrorResponse) => this.apiService.httpResponseErrorHandler(error))
      );
  }
}
