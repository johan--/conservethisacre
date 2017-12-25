import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromAuth from '../reducers';
import * as auth from '../actions/auth.actions';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { TokenStorage } from '../services/token.storage';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private store: Store<fromAuth.AuthState>,
              private tokenStorage: TokenStorage,
              private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.tokenStorage.getToken();

    if (!token) {
      this.store.dispatch(new auth.SetUser({role: 'anonymous'}));
      return true;
    }

    return this.authService.verify(this.tokenStorage.getToken())
      .do(data => {
        if (!data.user) {
          this.tokenStorage.removeToken();
          this.store.dispatch(new auth.SetUser({ role: 'anonymous'}));
        } else {
          this.store.dispatch(new auth.SetUser(data.user));
        }
      }).mapTo(true);
  }
}
