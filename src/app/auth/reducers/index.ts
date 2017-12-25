import * as fromAuth from './auth.reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';

/**
 * Parcel state
 */
export interface AuthState {
  auth: fromAuth.State;
}

/**
 * Main reducers map for this module
 */
export const reducers = {
  auth: fromAuth.reducer
};

export const ADMIN_ROLE = 'admin';
export const ANONYMOUS_ROLE = 'anonymous';

/**
 * Main selector that returns Parcels state from root application state
 */
export const getAuthState = createFeatureSelector<AuthState>('auth');

export const isBusy = createSelector(getAuthState, state => state.auth.busy);
export const getLoginError = createSelector(getAuthState, state => state.auth.error);
export const getUserDetails = createSelector(getAuthState, state => state.auth.user);
export const getIsLogged = createSelector(getUserDetails, user => user ? user.role != ANONYMOUS_ROLE : null);
export const getIsAdmin = createSelector(getUserDetails, user => user.role == ADMIN_ROLE);
