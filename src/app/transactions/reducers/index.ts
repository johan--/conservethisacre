import * as fromTransactions from './transactions.reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';

/**
 * Forest state
 */
export interface TransactionsState {
  transactions: fromTransactions.State;
}

/**
 * Main reducers map for this module
 */
export const reducers = {
  transactions: fromTransactions.reducer,
};

/**
 * Main selector that returns Forests state from root application state
 */
export const getTransactionsState = createFeatureSelector<TransactionsState>('transactions');

export const getTransactionEntitiesState = createSelector(getTransactionsState, (state) => state.transactions);

export const {selectAll} = fromTransactions.adapter.getSelectors(getTransactionEntitiesState);
