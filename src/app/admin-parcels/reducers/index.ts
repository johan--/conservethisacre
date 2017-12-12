import * as fromParcel from './parcel.reducer';
import * as fromForest from './forest.reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';

/**
 * Parcel state
 */
export interface ParcelState {
  parcels: fromParcel.State;
  forests: fromForest.State;
}

/**
 * Main reducers map for this module
 */
export const reducers = {
  parcels: fromParcel.reducer,
  forests: fromForest.reducer
};

/**
 * Main selector that returns Parcels state from root application state
 * @type {MemoizedSelector<Object, DashboardState>}
 */
export const getParcelsState = createFeatureSelector<ParcelState>('adminParcels');

export const getParcelEntitiesState = createSelector(getParcelsState, (state) => state.parcels);
export const getForestEntitiesState = createSelector(getParcelsState, (state) => state.forests);

export const {selectAll} = fromParcel.adapter.getSelectors(getParcelEntitiesState);
export const isParcelBusy = createSelector(getParcelEntitiesState, state => state.busy);

// export from forests subtree
export const {selectAll : getAllForests} = fromForest.adapter.getSelectors(getForestEntitiesState);
