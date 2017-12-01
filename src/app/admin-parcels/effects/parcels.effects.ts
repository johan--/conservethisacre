import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as parcels from '../actions/parcel.actions';
import { ForestService } from '../../core/services/forest.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import { ParcelService } from '../../core/services/parcel.service';

@Injectable()
export class ParcelsEffects {
  /**
   * Default constructor
   * @param actions$
   * @param store$
   * @param parcelService
   */
  constructor(private actions$: Actions, private parcelService: ParcelService) {
  }

  /**
   * Finds all forests
   * todo: Add error handling with toasts
   */
  @Effect()
  find = this.actions$.ofType<parcels.Find>(parcels.FIND)
    .switchMap(() => {
      return this.parcelService.find()
        .map(data => new parcels.Set(data))
        .catch(err => Observable.empty());
    });

  /**
   * Deletes parcel from server
   * todo: Add error handling with toasts
   */
  @Effect()
  delete = this.actions$.ofType<parcels.Delete>(parcels.DELETE)
    .switchMap(({payload}) => {
      return this.parcelService.delete(payload)
        .map(data  => new parcels.Set(data))
        .catch(err => Observable.empty());
    });

  /**
   * Deletes forest from server
   * todo: Add error handling with toasts
   */
  @Effect()
  save = this.actions$.ofType<parcels.Save>(parcels.SAVE)
    .switchMap(({payload}) => {
      return this.parcelService.save(payload)
        .map(data  => new parcels.Set(data))
        .catch(err => Observable.empty());
    });

}
