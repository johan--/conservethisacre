import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromAuth from '../reducers';
import * as auth from '../actions/auth.actions';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
import { TokenStorage } from '../services/token.storage';

@Injectable()
export class VerifyResolve implements Resolve<boolean> {
  constructor(private store: Store<fromAuth.AuthState>, private tokenStorage: TokenStorage) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    this.store.dispatch(new auth.Verify(this.tokenStorage.getToken()));
console.log('\n\n\n RESOLVE');
    // Skips store initialization parameter
    // TODO: something was wrong here when store is initialized with SSR. Looks like there was no
    // this first initialization param. Must be checked
    return this.store.select(fromAuth.isLogged);
  }
}
