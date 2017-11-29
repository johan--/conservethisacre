import { Routes } from '@angular/router';
import { IndexComponent } from './containers/index/index.component';
import { ForestsResolve } from './resolves/forests.resolve';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    resolve: {forests: ForestsResolve}
  }
];
