import * as forests from '../actions/forests.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IForest } from '../../core/models/forest';

/**
 * Main State interface
 */
export interface State extends EntityState<IForest> {
  selectedParcelId: number | null;
  busy: boolean;
}

export const adapter: EntityAdapter<IForest> = createEntityAdapter<IForest>({
  selectId: (forest: IForest) => forest.id
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
export function reducer(state = initialState, action: forests.All): State {
  switch (action.type) {
    case forests.SET:
      return {...state, ...adapter.addAll(action.payload, state), busy: false};
  }
  return state;
}
