import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './containers/index/index.component';
import { EditComponent } from './containers/edit/edit.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { ParcelsResolve } from './resolves/parcels.resolve';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForestsResolve } from './resolves/forests.resolve';
import { EffectsModule } from '@ngrx/effects';
import { ParcelsEffects } from './effects/parcels.effects';
import { ForestsEffects } from './effects/forests.effects';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('parcels', reducers),
    EffectsModule.forFeature([ParcelsEffects, ForestsEffects])
  ],
  providers: [ParcelsResolve, ForestsResolve],
  declarations: [IndexComponent, EditComponent],
  entryComponents: [EditComponent]
})
export class AdminParcelsModule { }
