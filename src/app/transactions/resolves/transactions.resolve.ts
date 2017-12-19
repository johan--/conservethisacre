import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromTransactions from '../reducers';
import * as transactions from '../actions/transactions.actions';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
import { ITransaction } from '../../core/models/transaction';

@Injectable()
export class TransactionsResolve implements Resolve<ITransaction[]> {
  constructor(private store: Store<fromTransactions.TransactionsState>) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ITransaction[] | Observable<ITransaction[]> | Promise<ITransaction[]> {
    this.store.dispatch(new transactions.Find());

    // Skips store initialization parameter
    // TODO: something was wrong here when store is initialized with SSR. Looks like there was no
    // this first initialization param. Must be checked
    return this.store.select(fromTransactions.selectAll).filter(v => !!v).take(1);
  }
}
