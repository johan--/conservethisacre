import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,

    children : [
      {path : '', redirectTo: 'forests', pathMatch: 'full'},
      {path: 'forests', loadChildren : '../admin-forests/admin-forests.module#AdminForestsModule'},
      {path: 'parcels', loadChildren : '../admin-parcels/admin-parcels.module#AdminParcelsModule'}
    ]
  }
];
