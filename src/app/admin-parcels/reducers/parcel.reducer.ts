import * as parcel from '../actions/parcel.actions';
import { IParcel } from '../../core/models/parcel';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

/**
 * Main State interface
 */
export interface State extends EntityState<IParcel> {
  selectedParcelId: number | null;
}

export const adapter: EntityAdapter<IParcel> = createEntityAdapter<IParcel>({
  selectId: (parcel: IParcel) => parcel.id
});

/**
 * Initial state
 */
export const initialState: State = adapter.getInitialState({
  selectedParcelId: null
});

/**
 * Main reducing function
 * @param {State} state
 * @param {All} action
 */
export function reducer(state = initialState, action: parcel.All): State {
  switch (action.type) {
    case parcel.SET: {
      return {...state, ...adapter.addMany(action.payload, state)};
    }
  }
  return state;
}
