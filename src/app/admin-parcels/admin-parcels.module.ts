import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './containers/index/index.component';
import { EditComponent } from './containers/edit/edit.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { ParcelsResolve } from './resolves/parcels.resolve';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('parcels', reducers)
  ],
  providers: [ParcelsResolve],
  declarations: [IndexComponent, EditComponent]
})
export class AdminParcelsModule { }
