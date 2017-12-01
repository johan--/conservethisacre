import { Routes } from '@angular/router';
import { NotFoundComponent } from './core/containers/not-found/not-found.component';

export const routes: Routes = [
  {path: '', redirectTo: 'admin', pathMatch: 'full'},
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },

  // {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: '**', component: NotFoundComponent}
];
