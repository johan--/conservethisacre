import * as fromForest from './forest.reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';

/**
 * Forest state
 */
export interface ForestState {
  forests: fromForest.State;
}

/**
 * Main reducers map for this module
 */
export const reducers = {
  forests: fromForest.reducer
};

/**
 * Main selector that returns Forests state from root application state
 * @type {MemoizedSelector<Object, DashboardState>}
 */
export const getForestsState = createFeatureSelector<ForestState>('adminForests');

export const getForestEntitiesState = createSelector(getForestsState, (state) => state.forests);
export const isForestsBusy = createSelector(getForestEntitiesState, (state) => state.busy);

export const {selectAll, selectTotal} = fromForest.adapter.getSelectors(getForestEntitiesState);
