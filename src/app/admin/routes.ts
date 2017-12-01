import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { VerifyResolve } from '../auth/resolves/verify.resolve';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate : [AuthGuard],
    // resolve: {user: VerifyResolve},

    children : [
      {path : '', redirectTo: 'forests', pathMatch: 'full'},
      {path: 'forests', loadChildren : '../admin-forests/admin-forests.module#AdminForestsModule'},
      {path: 'parcels', loadChildren : '../admin-parcels/admin-parcels.module#AdminParcelsModule'}
    ]
  }
];
