import * as auth from '../actions/auth.actions';
import { User } from '../../core/models/user';

/**
 * Main State interface
 */
export interface State {
  user: User;
  busy: boolean;
  error: boolean;
}

/**
 * Initial state
 */
export const initialState: State = {
  user: null,
  busy: false,
  error: false
};

/**
 * Main reducing function
 * @param {State} state
 * @param {All} action
 */
export function reducer(state = initialState, action: auth.All): State {
  switch (action.type) {
    case auth.LOGIN:
      return {...state, busy: true, error: false};

    case auth.LOGIN_SUCCESS:
      return {...state, user: action.payload, busy: false};

    case auth.SET_USER:
      return {...state, user: action.payload};

    case auth.LOGIN_FAILED:
      return {...state, busy: false, error: true};
  }

  return state;
}
