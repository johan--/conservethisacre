import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as transactions from '../actions/transactions.actions';
import { TransactionService } from '../../core/services/transaction.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';

@Injectable()
export class TransactionsEffects {
  /**
   * Default constructor
   * @param actions$
   * @param store$
   * @param transactionService
   */
  constructor(private actions$: Actions, private transactionService: TransactionService) {
  }

  /**
   * Finds all forests
   * todo: Add error handling with toasts
   */
  @Effect()
  find = this.actions$.ofType<transactions.Find>(transactions.FIND)
    .switchMap(() => {
      return this.transactionService.findOwn()
        .map(data => new transactions.Set(data))
        .catch(err => Observable.empty());
    });
}
