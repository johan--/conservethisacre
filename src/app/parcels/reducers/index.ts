import * as fromParcels from './parcels.reducer';
import * as fromParcel from './parcel.reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';

/**
 * Parcel state
 */
export interface ParcelState {
  parcels: fromParcels.State;
  parcel: fromParcel.State;
}

/**
 * Main reducers map for this module
 */
export const reducers = {
  parcels: fromParcels.reducer,
  parcel: fromParcel.reducer
};

/**
 * Main selector that returns Parcels state from root application state
 * @type {MemoizedSelector<Object, DashboardState>}
 */
export const getParcelsState = createFeatureSelector<ParcelState>('parcels');
export const getParcelState = createSelector(getParcelsState, state => state.parcel);

export const getParcelEntitiesState = createSelector(getParcelsState, (state) => state.parcels);

export const {selectAll} = fromParcels.adapter.getSelectors(getParcelEntitiesState);

export const getParcel = createSelector(getParcelState, state => state.parcel);
