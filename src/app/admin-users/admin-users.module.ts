import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './containers/index/index.component';
import { EditComponent } from './containers/edit/edit.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { UsersGuard } from './guards/users.guard';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './effects/users.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorModule } from 'ngx-form-error';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormErrorModule,

    StoreModule.forFeature('adminUsers', reducers),
    EffectsModule.forFeature([UsersEffects])
  ],
  declarations: [IndexComponent, EditComponent],
  providers: [UsersGuard],
  entryComponents: [EditComponent]
})
export class AdminUsersModule { }
