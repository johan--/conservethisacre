import { Action } from '@ngrx/store';
import { IParcel } from '../../core/models/parcel';

export const FIND = '[Parcel] Requests parcels from server';
export const SET = '[Parcel] Sets parcels to state';

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

  constructor(public payload: IParcel[]) {
  }
}

export type All = Find | Set;
