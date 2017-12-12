import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IParcel } from '../../core/models/parcel';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromParcel from '../reducers';
import * as parcels from '../actions/parcels.actions';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';

@Injectable()
export class ParcelsResolve implements Resolve<IParcel[]> {
  constructor(private store: Store<fromParcel.ParcelState>) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IParcel[] | Observable<IParcel[]> | Promise<IParcel[]> {
    this.store.dispatch(new parcels.Find());

    // Skips store initialization parameter
    // TODO: something was wrong here when store is initialized with SSR. Looks like there was no
    // this first initialization param. Must be checked
    return this.store.select(fromParcel.selectAll).take(1);
  }
}
