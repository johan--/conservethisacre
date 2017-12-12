import { Routes } from '@angular/router';
import { ParcelsComponent } from './containers/parcels/parcels.component';
import { ParcelsResolve } from './resolves/parcels.resolve';
import { ParcelComponent } from './containers/parcel/parcel.component';
import { ParcelResolve } from './resolves/parcel.resolve';

export const routes: Routes = [
  { path: '', resolve: {parcels : ParcelsResolve}, component: ParcelsComponent},
  { path: ':id', resolve: {parcels : ParcelsResolve, parcel : ParcelResolve}, component: ParcelComponent}
];
