import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import { TokenStorage } from './token.storage';
import { User } from '../../core/models/user';
import { AuthenticateData, AuthenticateParams } from '../models/authenticate';

const URL_DETAILS = '/users/own';
const URL_LOGIN = '/auth/signin';
const URL_VERIFY = '/auth/verify';

@Injectable()
export class AuthService {

  constructor(private api: ApiService, private tokenStorage: TokenStorage) {
    console.log('Token from storage: ', this.tokenStorage.getToken());
  }

  /**
   * Load current logged user details
   */
  loadDetails(): Observable<User> {
    return this.api.get(URL_DETAILS);
  }

  /**
   * Authenticates user
   */
  login(auth: AuthenticateParams): Observable<AuthenticateData> {
    return this.api.post<AuthenticateData>(URL_LOGIN, auth)
      .do(d => this.tokenStorage.setToken(d.token));
  }

  /**
   * Verifies stored token and if ok - returns authenticated data. Throws an error if token is invalid
   * @returns {Observable<AuthenticateData>}
   */
  verify(token: string): Observable<AuthenticateData> {
    return this.api.post<AuthenticateData>(URL_VERIFY, {token})
      .do(d => !d.user && this.tokenStorage.removeToken());
  }

  /**
   * Logs user out from system
   */
  logout(): Observable<{}> {
    this.tokenStorage.removeToken();
    return Observable.empty();
  }
}
