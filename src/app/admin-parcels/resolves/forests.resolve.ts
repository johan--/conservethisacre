import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IForest } from '../../core/models/forest';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromParcel from '../reducers';
import * as forests from '../actions/forest.actions';
import 'rxjs/add/operator/take';

@Injectable()
export class ForestsResolve implements Resolve<IForest[]> {
  constructor(private store: Store<fromParcel.ParcelState>) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IForest[] | Observable<IForest[]> | Promise<IForest[]> {
    this.store.dispatch(new forests.Find());
    // Actually we dont need to wait for this data?
    return [];
  }
}
