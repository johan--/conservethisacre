import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IParcel } from '../../core/models/parcel';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromParcel from '../reducers';
import * as parcel from '../actions/parcel.actions';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/filter';

@Injectable()
export class ParcelResolve implements Resolve<IParcel> {
  constructor(private store: Store<fromParcel.ParcelState>) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IParcel | Observable<IParcel> | Promise<IParcel> {
    // this.store.dispatch(new parcels.Find());
    this.store.dispatch(new parcel.FindOne(route.params.id));

    return this.store.select(fromParcel.getParcel).filter(v => !!v).take(1);
  }
}
