import * as fromParcel from './parcel.reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';

/**
 * Parcel state
 */
export interface ParcelState {
  parcels: fromParcel.State;
}

/**
 * Main reducers map for this module
 */
export const reducers = {
  parcels: fromParcel.reducer
};

/**
 * Main selector that returns Parcels state from root application state
 * @type {MemoizedSelector<Object, DashboardState>}
 */
export const getParcelsState = createFeatureSelector<ParcelState>('parcels');

export const getParcelEntitiesState = createSelector(getParcelsState, (state) => state.parcels);

export const {selectAll, selectTotal} = fromParcel.adapter.getSelectors(getParcelEntitiesState);
