import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as profile from '../actions/profile.actions';
import * as auth from '../../auth/actions/auth.actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import { UserService } from '../../core/services/user.service';

@Injectable()
export class ProfileEffects {
  /**
   * Default constructor
   * @param actions$
   * @param userService
   */
  constructor(private actions$: Actions, private userService: UserService) {
  }

  /**
   * Saves own user data
   * todo: Add error handling with toasts
   */
  @Effect()
  saveOwn = this.actions$.ofType<profile.Save>(profile.SAVE)
    .switchMap(action => {
      return this.userService.saveOwn(action.payload)
        .map(data => new auth.SetUser(data))
        .catch(err => Observable.empty());
    });
}
