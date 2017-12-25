import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as auth from '../actions/auth.actions';
import { State } from '../reducers/auth.reducer';
import { AuthService } from '../services/auth.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthEffects {

  /**
   * Loads currently logged user details
   */
  @Effect()
  verify$: Observable<Action> = this.actions$.ofType<auth.Verify>(auth.VERIFY)
    .switchMap(({payload}) => {
      return this.authService.verify(payload).map(authData => new auth.LoginSuccess(authData.user))
        .catch(e => Observable.empty<Action>());
    });

  /**
   * Authenticate user
   */
  @Effect()
  login$: Observable<Action> = this.actions$.ofType<auth.Login>(auth.LOGIN)
    .switchMap(({payload}) => {
      return this.authService.login(payload).map(res => new auth.LoginSuccess(res.user))
        .do(() => this.router.navigate(['/admin']))
        .catch(e => Observable.of(new auth.LoginFailed()));
    });

  /**
   * Logs user out
   */
  @Effect()
  logout$: Observable<Action> = this.actions$.ofType(auth.LOGOUT)
    .switchMap(() => {
      return this.authService.logout().switchMap(() => Observable.empty());
    });

  /**
   * Default constructor
   * @param actions$
   * @param store$
   * @param authService
   */
  constructor(private actions$: Actions, private store$: Store<State>, private authService: AuthService, private router: Router) {
  }

}
