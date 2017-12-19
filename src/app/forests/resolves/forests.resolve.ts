import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IForest } from '../../core/models/forest';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromForest from '../reducers';
import * as forests from '../actions/forests.actions';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';

@Injectable()
export class ForestsResolve implements Resolve<IForest[]> {
  constructor(private store: Store<fromForest.ForestState>) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IForest[] | Observable<IForest[]> | Promise<IForest[]> {
    this.store.dispatch(new forests.Find());

    // Skips store initialization parameter
    // TODO: something was wrong here when store is initialized with SSR. Looks like there was no
    // this first initialization param. Must be checked
    return this.store.select(fromForest.selectAll).take(1);
  }
}
