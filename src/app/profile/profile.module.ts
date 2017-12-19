import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './containers/profile/profile.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './effects/profile.effects';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('profile', reducers),
    EffectsModule.forFeature([ProfileEffects])
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
