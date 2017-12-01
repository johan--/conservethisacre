import { Action } from '@ngrx/store';
import { IParcel } from '../../core/models/parcel';

export const FIND = '[Parcel] Requests parcels from server';
export const SET = '[Parcel] Sets parcels to state';
export const SAVE = '[Parcel] Saves parcel data';
export const DELETE = '[Parcel] Deletes parcel';

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
 * Saves parcel to server
 */
export class Save implements Action {
  readonly type = SAVE;

  constructor(public payload: IParcel) {
  }
}

/**
 * Deletes parcel
 */
export class Delete implements Action {
  readonly type = DELETE;

  constructor(public payload: IParcel) {
  }
}

export type All = Find | Set | Save | Delete;
