import { Action } from '@ngrx/store';
import { IParcel } from '../../core/models/parcel';
import { StripeChargeRequest } from '../../core/interfaces/stripe-charge.request';

export const FINDONE = '[Parcel] Finds parcel from server';
export const SET = '[Parcel] Set parcel to state';
export const CHARGE = '[Parcel] Charge request from stripe';

/**
 * Requests parcels list
 */
export class FindOne implements Action {
  readonly type = FINDONE;
  constructor(public payload: number) {
  }
}

/**
 * Sets parcels data
 */
export class Set implements Action {
  readonly type = SET;

  constructor(public payload: IParcel) {
  }
}

/**
 * Charge request sent to our server from stripe
 */
export class Charge implements Action {
  readonly type = CHARGE;

  constructor(public payload: StripeChargeRequest) {
  }
}


export type All = FindOne | Set;
