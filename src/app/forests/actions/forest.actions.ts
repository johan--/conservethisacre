import { Action } from '@ngrx/store';
import { IForest } from '../../core/models/forest';

export const FINDONE = '[Forest] Finds forest by id';
export const SET = '[Forest] Set parcel to state';

/**
 * Requests forest entry
 */
export class FindOne implements Action {
  readonly type = FINDONE;
  constructor(public payload: number) {
  }
}

/**
 * Sets forest data to state
 */
export class Set implements Action {
  readonly type = SET;

  constructor(public payload: IForest) {
  }
}

export type All = FindOne | Set;
