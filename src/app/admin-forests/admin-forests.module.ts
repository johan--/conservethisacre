import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './containers/index/index.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { EditComponent } from './containers/edit/edit.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/index';
import { ForestsResolve } from './resolves/forests.resolve';
import { EffectsModule } from '@ngrx/effects';
import { ForestsEffects } from './effects/forests.effects';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('adminForests', reducers),
    EffectsModule.forFeature([ForestsEffects])
  ],
  providers : [ForestsResolve],
  declarations: [IndexComponent, EditComponent],
  entryComponents: [EditComponent]
})
export class AdminForestsModule {
}
