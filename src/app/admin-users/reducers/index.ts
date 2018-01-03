import * as fromUser from './users.reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';

/**
 * User state
 */
export interface UserState {
  users: fromUser.State;
}

/**
 * Main reducers map for this module
 */
export const reducers = {
  users: fromUser.reducer
};

/**
 * Main selector that returns Users state from root application state
 * @type {MemoizedSelector<Object, UserState>}
 */
export const getUsersState = createFeatureSelector<UserState>('adminUsers');

export const getUserEntitiesState = createSelector(getUsersState, (state) => state.users);
export const isUsersBusy = createSelector(getUserEntitiesState, (state) => state.busy);

export const {selectAll : getAllUsers} = fromUser.adapter.getSelectors(getUserEntitiesState);
