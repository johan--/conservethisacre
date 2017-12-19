import * as transactions from '../actions/transactions.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ITransaction } from '../../core/models/transaction';

/**
 * Main State interface
 */
export interface State extends EntityState<ITransaction> {
  busy: boolean;
}

export const adapter: EntityAdapter<ITransaction> = createEntityAdapter<ITransaction>({
  selectId: (transaction: ITransaction) => transaction.id
});

/**
 * Initial state
 */
export const initialState: State = adapter.getInitialState({
  busy: false
});

/**
 * Main reducing function
 * @param {State} state
 * @param {All} action
 */
export function reducer(state = initialState, action: transactions.All): State {
  switch (action.type) {
    case transactions.SET:
      return {...state, ...adapter.addAll(action.payload, state), busy: false};
  }
  return state;
}
