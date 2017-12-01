import * as parcel from '../actions/parcel.actions';
import { IParcel } from '../../core/models/parcel';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

/**
 * Main State interface
 */
export interface State extends EntityState<IParcel> {
  selectedParcelId: number | null;
  busy: boolean;
}

export const adapter: EntityAdapter<IParcel> = createEntityAdapter<IParcel>({
  selectId: (parcel: IParcel) => parcel.id
});

/**
 * Initial state
 */
export const initialState: State = adapter.getInitialState({
  selectedParcelId: null,
  busy: false
});

/**
 * Main reducing function
 * @param {State} state
 * @param {All} action
 */
export function reducer(state = initialState, action: parcel.All): State {
  switch (action.type) {
    case parcel.SET:
      return {...state, ...adapter.addAll(action.payload, state), busy: false};

    case parcel.SAVE:
      return {...state, busy: true};

    case parcel.DELETE:
      return {...state, busy: true};

  }
  return state;
}
