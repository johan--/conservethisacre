import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './containers/index/index.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { EditComponent } from './containers/edit/edit.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/index';
import { ForestsResolve } from './resolves/forests.resolve';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('forests', reducers)
  ],
  providers : [ForestsResolve],
  declarations: [IndexComponent, EditComponent]
})
export class AdminForestsModule {
}
