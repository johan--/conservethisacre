import { Routes } from '@angular/router';
import { SetupComponent } from './containers/setup/setup.component';
import { NoAdminGuard } from './guards/no-admin.guard';

export const routes: Routes = [
  {path: '', component: SetupComponent, canActivate: [NoAdminGuard]}
];
