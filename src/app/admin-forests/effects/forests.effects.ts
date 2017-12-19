import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as fromForests from '../reducers';
import * as forests from '../actions/forest.actions';
import { ForestService} from '../../core/services/forest.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';

@Injectable()
export class ForestsEffects {
  /**
   * Default constructor
   * @param actions$
   * @param store$
   * @param forestService
   */
  constructor(private actions$: Actions, private store$: Store<fromForests.ForestState>, private forestService: ForestService) {
  }

  /**
   * Deletes forest from server
   * todo: Add error handling with toasts
   */
  @Effect()
  delete = this.actions$.ofType<forests.Delete>(forests.DELETE)
    .switchMap(({payload}) => {
      return this.forestService.delete(payload)
        .map(data  => new forests.Set(data))
        .catch(err => Observable.empty());
    });

  /**
   * Deletes forest from server
   * todo: Add error handling with toasts
   */
  @Effect()
  save = this.actions$.ofType<forests.Save>(forests.SAVE)
    .switchMap(({payload}) => {
      return this.forestService.save(payload)
        .map(data  => new forests.Set(data))
        .catch(err => Observable.empty());
    });

  /**
   * Finds all forests
   * todo: Add error handling with toasts
   */
  @Effect()
  find = this.actions$.ofType<forests.Find>(forests.FIND)
    .switchMap(() => {
      return this.forestService.find()
        .map(data  => new forests.Set(data))
        .catch(err => Observable.empty());
    });
}
