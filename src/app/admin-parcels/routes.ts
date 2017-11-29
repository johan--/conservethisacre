import { Routes } from '@angular/router';
import { IndexComponent } from './containers/index/index.component';
import { ParcelsResolve } from './resolves/parcels.resolve';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    resolve: {parcels: ParcelsResolve}
  }
];
