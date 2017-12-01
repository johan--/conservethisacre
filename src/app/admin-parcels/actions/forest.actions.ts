import { Action } from '@ngrx/store';
import { IForest } from '../../core/models/forest';

export const FIND = '[Parcel] Requests forests from server';
export const SET = '[Parcel] Sets forests to state';

/**
 * Requests parcels list
 */
export class Find implements Action {
  readonly type = FIND;
}

/**
 * Sets parcels data
 */
export class Set implements Action {
  readonly type = SET;

  constructor(public payload: IForest[]) {
  }
}

export type All = Find | Set;
