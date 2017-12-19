import * as fromProfile from './profile.reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';

/**
 * Forest state
 */
export interface ProfileState {
  profile: fromProfile.State;
}

/**
 * Main reducers map for this module
 */
export const reducers = {
  transactions: fromProfile.reducer,
};

/**
 * Main selector that returns Forests state from root application state
 */
export const getProfileState = createFeatureSelector<ProfileState>('profile');
