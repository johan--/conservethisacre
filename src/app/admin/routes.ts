import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthAdminGuard } from '../auth/guards/auth-admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate : [AuthAdminGuard],
    // resolve: {user: VerifyResolve},

    children : [
      {path : '', redirectTo: 'forests', pathMatch: 'full'},
      {path: 'forests', loadChildren : '../admin-forests/admin-forests.module#AdminForestsModule'},
      {path: 'parcels', loadChildren : '../admin-parcels/admin-parcels.module#AdminParcelsModule'}
    ]
  }
];
