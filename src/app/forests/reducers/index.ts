import * as fromForests from './forests.reducer';
import * as fromForest from './forest.reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';

/**
 * Forest state
 */
export interface ForestState {
  forests: fromForests.State;
  forest: fromForest.State;
}

/**
 * Main reducers map for this module
 */
export const reducers = {
  forests: fromForests.reducer,
  forest: fromForest.reducer
};

/**
 * Main selector that returns Forests state from root application state
 */
export const getForestsState = createFeatureSelector<ForestState>('forests');
export const getForestState = createSelector(getForestsState, state => state.forest);

export const getForestEntitiesState = createSelector(getForestsState, (state) => state.forests);

export const {selectAll} = fromForests.adapter.getSelectors(getForestEntitiesState);

export const getForest = createSelector(getForestState, state => state.forest);
