import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IParcel } from '../../core/models/parcel';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromParcel from '../reducers';
import * as parcel from '../actions/parcel.actions';
import 'rxjs/add/operator/take';

@Injectable()
export class ParcelsResolve implements Resolve<IParcel[]> {
  constructor(private store: Store<fromParcel.ParcelState>) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IParcel[] | Observable<IParcel[]> | Promise<IParcel[]> {
    this.store.dispatch(new parcel.Set([{id: 1, cost: 10, forest: null}, {id: 2, cost: 12, forest: null}]));

    return this.store.select(fromParcel.selectAll).take(1);
  }
}
