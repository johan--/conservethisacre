import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IForest } from '../../core/models/forest';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromForests from '../reducers';
import * as forest from '../actions/forest.actions';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';

@Injectable()
export class ForestResolve implements Resolve<IForest> {
  constructor(private store: Store<fromForests.ForestState>) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IForest | Observable<IForest> | Promise<IForest> {
    this.store.dispatch(new forest.FindOne(route.params.id));

    return this.store.select(fromForests.getForest).filter(v => !!v).take(1);
  }
}
