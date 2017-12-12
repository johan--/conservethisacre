import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { ParcelsComponent } from './containers/parcels/parcels.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { ParcelsEffects } from './effects/parcels.effects';
import { ParcelsResolve } from './resolves/parcels.resolve';
import { ParcelComponent } from './containers/parcel/parcel.component';
import { ParcelResolve } from './resolves/parcel.resolve';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature('parcels', reducers),
    EffectsModule.forFeature([ParcelsEffects])
  ],
  declarations: [ParcelsComponent, ParcelComponent],
  providers : [ParcelsResolve, ParcelResolve]
})
export class ParcelsModule {
}
