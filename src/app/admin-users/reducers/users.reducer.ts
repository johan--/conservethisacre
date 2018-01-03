import * as user from '../actions/users.actions';
import { User } from '../../core/models/user';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

/**
 * Main State interface
 */
export interface State extends EntityState<User> {
  selectedUserId: number | null;
  busy: boolean;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id
});

/**
 * Initial state
 */
export const initialState: State = adapter.getInitialState({
  selectedUserId: null,
  busy: false
});

/**
 * Main reducing function
 * @param {State} state
 * @param {All} action
 */
export function reducer(state = initialState, action: user.All): State {
  switch (action.type) {
    case user.SET:
      return {...state, ...adapter.addAll(action.payload, state), busy : false};

    case user.DELETE:
      return {...state, busy : true};

    case user.SAVE:
      return {...state, busy : true};
  }

  return state;
}
