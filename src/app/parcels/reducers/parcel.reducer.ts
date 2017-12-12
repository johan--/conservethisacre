import * as parcel from '../actions/parcel.actions';
import { IParcel } from '../../core/models/parcel';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

/**
 * Main State interface
 */
export interface State {
  parcel: IParcel;
}


/**
 * Initial state
 */
export const initialState: State = {
  parcel: null
};

/**
 * Main reducing function
 * @param {State} state
 * @param {All} action
 */
export function reducer(state = initialState, action: parcel.All): State {
  switch (action.type) {
    case parcel.SET:
      return {...state, parcel: action.payload};

  }
  return state;
}
