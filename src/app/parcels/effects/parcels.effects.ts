import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as parcels from '../actions/parcels.actions';
import * as parcel from '../actions/parcel.actions';
import { ForestService } from '../../core/services/forest.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import { ParcelService } from '../../core/services/parcel.service';
import { StripeService } from '../../core/services/stripe.service';

@Injectable()
export class ParcelsEffects {
  /**
   * Default constructor
   * @param actions$
   * @param store$
   * @param parcelService
   */
  constructor(private actions$: Actions, private parcelService: ParcelService, private stripeService: StripeService) {
  }

  /**
   * Finds all parcels
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
   * Finds one parcel
   * todo: Add error handling with toasts
   */
  @Effect()
  findOne = this.actions$.ofType<parcel.FindOne>(parcel.FINDONE)
    .switchMap(action => {
      return this.parcelService.findOneById(action.payload)
        .map(data => new parcel.Set(data))
        .catch(err => Observable.empty());
    });

  /**
   * Finds all parcels
   * todo: Add error handling with toasts
   */
  @Effect()
  charge$ = this.actions$.ofType<parcel.Charge>(parcel.CHARGE)
    .switchMap(action => {
      return this.stripeService.charge(action.payload)
        .map(data => new parcel.Set(data))
        .catch(err => Observable.empty());
    });

}
