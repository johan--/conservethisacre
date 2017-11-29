import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IForest } from '../../core/models/forest';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromForest from '../reducers';
import * as forest from '../actions/forest.actions';
import 'rxjs/add/operator/take';

@Injectable()
export class ForestsResolve implements Resolve<IForest[]> {
  constructor(private store: Store<fromForest.ForestState>) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IForest[] | Observable<IForest[]> | Promise<IForest[]> {
    this.store.dispatch(new forest.Set([{id: 1, description: 'Dummy data from NGRX state'}]));

    return this.store.select(fromForest.selectAll).take(1);
  }
}
