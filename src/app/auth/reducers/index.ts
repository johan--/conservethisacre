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

/**
 * Main selector that returns Parcels state from root application state
 */
export const getAuthState = createFeatureSelector<AuthState>('auth');

export const isBusy = createSelector(getAuthState, state => state.auth.busy);
export const isLogged = createSelector(getAuthState, state => !!state.auth.user);
export const getUserDetails = createSelector(getAuthState, state => state.auth.user);
