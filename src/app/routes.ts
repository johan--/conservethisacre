import { Routes } from '@angular/router';
import { NotFoundComponent } from './core/containers/not-found/not-found.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { TokenGuard } from './auth/guards/token.guard';
import { SetupGuard } from './core/guards/setup.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [TokenGuard, SetupGuard],
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', loadChildren: './home/home.module#HomeModule'},
      {path: 'parcels', loadChildren: './parcels/parcels.module#ParcelsModule'},
      {path: 'forests', loadChildren: './forests/forests.module#ForestsModule'},
      {path: 'profile', loadChildren: './profile/profile.module#ProfileModule'},
      {path: 'transactions', loadChildren: './transactions/transactions.module#TransactionsModule'}
    ]
  },

  {
    path: 'setup',
    canActivate: [],
    loadChildren: './setup/setup.module#SetupModule'
  },

  {
    path: 'admin',
    canActivate: [TokenGuard, SetupGuard],
    loadChildren: './admin/admin.module#AdminModule'
  },


  {path: '**', component: NotFoundComponent}
];
