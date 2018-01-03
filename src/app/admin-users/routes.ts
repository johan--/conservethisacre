import { Routes } from '@angular/router';
import { IndexComponent } from './containers/index/index.component';
import { UsersGuard } from './guards/users.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate : [UsersGuard],
    component: IndexComponent
  }
];
