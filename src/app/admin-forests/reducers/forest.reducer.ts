import * as forest from '../actions/forest.actions';
import { IForest } from '../../core/models/forest';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

/**
 * Main State interface
 */
export interface State extends EntityState<IForest> {
  selectedForestId: number | null;
  busy: boolean;
}

export const adapter: EntityAdapter<IForest> = createEntityAdapter<IForest>({
  selectId: (forest: IForest) => forest.id
});

/**
 * Initial state
 */
export const initialState: State = adapter.getInitialState({
  selectedForestId: null,
  busy: false
});

/**
 * Main reducing function
 * @param {State} state
 * @param {All} action
 */
export function reducer(state = initialState, action: forest.All): State {
  switch (action.type) {
    case forest.SET:
      return {...state, ...adapter.addAll(action.payload, state), busy : false};

    case forest.DELETE:
      return {...state, busy : true};

    case forest.SAVE:
      return {...state, busy : true};
  }

  return state;
}
