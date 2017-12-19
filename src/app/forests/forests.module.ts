import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForestComponent } from './containers/forest/forest.component';
import { ForestsComponent } from './containers/forests/forests.component';
import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { ForestsResolve } from './resolves/forests.resolve';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { ForestsEffects } from './effects/forests.effects';
import { ForestResolve } from './resolves/forest.resolve';
import { GapiModule } from '../gapi/gapi.module';
import { GmapsGuard } from './guards/gmaps.guard';
import { MapComponent } from './components/map/map.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GapiModule,
    StoreModule.forFeature('forests', reducers),
    EffectsModule.forFeature([ForestsEffects])
  ],
  providers: [ForestsResolve, ForestResolve, GmapsGuard],
  declarations: [ForestComponent, ForestsComponent, MapComponent]
})
export class ForestsModule { }
