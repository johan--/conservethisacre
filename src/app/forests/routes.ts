import { Routes } from '@angular/router';
import { ForestsComponent } from './containers/forests/forests.component';
import { ForestsResolve } from './resolves/forests.resolve';
import { ForestComponent } from './containers/forest/forest.component';
import { ForestResolve } from './resolves/forest.resolve';
import { GmapsGuard } from './guards/gmaps.guard';

export const routes: Routes = [
  {path: '', resolve: {forests: ForestsResolve}, component: ForestsComponent},
  {path: ':id', resolve: {forest: ForestResolve}, canActivate: [GmapsGuard], component: ForestComponent}
];
