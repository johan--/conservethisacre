import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as fromUsers from '../reducers';
import * as users from '../actions/users.actions';
import { UserService} from '../../core/services/user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';

@Injectable()
export class UsersEffects {
  /**
   * Default constructor
   * @param actions$
   * @param store$
   * @param userService
   */
  constructor(private actions$: Actions, private store$: Store<fromUsers.UserState>, private userService: UserService) {
  }

  /**
   * Deletes user from server
   * todo: Add error handling with toasts
   */
  @Effect()
  delete = this.actions$.ofType<users.Delete>(users.DELETE)
    .switchMap(({payload}) => {
      return this.userService.delete(payload)
        .map(data  => new users.Set(data))
        .catch(err => Observable.empty());
    });

  /**
   * Deletes user from server
   * todo: Add error handling with toasts
   */
  @Effect()
  save = this.actions$.ofType<users.Save>(users.SAVE)
    .switchMap(({payload}) => {
      return this.userService.save(payload)
        .map(data  => new users.Set(data))
        .catch(err => Observable.empty());
    });

  /**
   * Finds all users
   * todo: Add error handling with toasts
   */
  @Effect()
  find = this.actions$.ofType<users.Find>(users.FIND)
    .switchMap(() => {
      return this.userService.find()
        .map(data  => new users.Set(data))
        .catch(err => Observable.empty());
    });
}
