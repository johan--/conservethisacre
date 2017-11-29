import { Action } from '@ngrx/store';
import { IForest } from '../../core/models/forest';

export const FIND = '[Forests] Requests forests from server';
export const SET = '[Forests] Sets forests to state';

/**
 * Requests forests list
 */
export class Find implements Action {
  readonly type = FIND;
}

/**
 * Sets forests data
 */
export class Set implements Action {
  readonly type = SET;

  constructor(public payload: IForest[]) {
  }
}

export type All = Find | Set;
