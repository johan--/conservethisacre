import { Action } from '@ngrx/store';
import { IParcel } from '../../core/models/parcel';

export const FIND = '[Parcel] Requests parcels from server';
export const SET = '[Parcel] Sets parcels to state';
export const SELECT = '[Parcel] Select parcel';

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

/**
 * Selects parcel
 */
export class Select implements Action {
  readonly type = SELECT;

  constructor(public payload: number) {
  }
}

export type All = Find | Set | Select;
