import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as forests from '../actions/forests.actions';
import * as forest from '../actions/forest.actions';
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
  constructor(private actions$: Actions, private forestService: ForestService) {
  }

  /**
   * Finds all forests
   * todo: Add error handling with toasts
   */
  @Effect()
  find = this.actions$.ofType<forests.Find>(forests.FIND)
    .switchMap(() => {
      return this.forestService.find()
        .map(data => new forests.Set(data))
        .catch(err => Observable.empty());
    });

  /**
   * Finds one forest
   * todo: Add error handling with toasts
   */
  @Effect()
  findOne = this.actions$.ofType<forest.FindOne>(forest.FINDONE)
    .switchMap(action => {
      return this.forestService.findOneById(action.payload)
        .map(data => new forest.Set(data))
        .catch(err => Observable.empty());
    });
}
