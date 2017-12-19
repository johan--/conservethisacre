import * as forest from '../actions/forest.actions';
import { IForest } from '../../core/models/forest';

/**
 * Main State interface
 */
export interface State {
  forest: IForest;
}


/**
 * Initial state
 */
export const initialState: State = {
  forest: null
};

/**
 * Main reducing function
 * @param {State} state
 * @param {All} action
 */
export function reducer(state = initialState, action: forest.All): State {
  switch (action.type) {
    case forest.FINDONE:
      return {...state, forest: null}
    case forest.SET:
      return {...state, forest: action.payload};

  }
  return state;
}
