import { Component, OnInit } from '@angular/core';
import { IParcel } from '../../../core/models/parcel';
import { Store } from '@ngrx/store';
import * as fromTransactions from '../../reducers';
import { Observable } from 'rxjs/Observable';
import { ITransaction } from '../../../core/models/transaction';

@Component({
  selector: 'conserve-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions$: Observable<ITransaction[]>;

  constructor(private store: Store<fromTransactions.TransactionsState>) {
    this.transactions$ = store.select(fromTransactions.selectAll);
  }

  ngOnInit() {
  }

}
