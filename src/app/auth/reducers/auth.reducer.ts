import * as auth from '../actions/auth.actions';
import { User } from '../../core/models/user';

/**
 * Main State interface
 */
export interface State {
  user: User;
  busy: boolean;
}

/**
 * Initial state
 */
export const initialState: State = {
  user: null,
  busy: false
};

/**
 * Main reducing function
 * @param {State} state
 * @param {All} action
 */
export function reducer(state = initialState, action: auth.All): State {
  switch (action.type) {
    case auth.LOGIN:
      return {...state, busy: true};

    case auth.LOGIN_SUCCESS:
      return {...state, user: action.payload, busy: false};

    case auth.LOGIN_FAILED:
      return {...state, busy: false};
  }

  return state;
}
