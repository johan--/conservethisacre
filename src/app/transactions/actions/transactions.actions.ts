import { Action } from '@ngrx/store';
import { ITransaction } from '../../core/models/transaction';

export const FIND = '[Transactions] Requests transactions from server';
export const SET = '[Transactions] Sets transactions data to state';

/**
 * Requests transactions list
 */
export class Find implements Action {
  readonly type = FIND;
}

/**
 * Sets transactions data
 */
export class Set implements Action {
  readonly type = SET;

  constructor(public payload: ITransaction[]) {
  }
}

export type All = Find | Set;
