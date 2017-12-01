import { Routes } from '@angular/router';
import { SigninComponent } from './containers/signin/signin.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NonAuthGuard } from './guards/non-auth.guard';

export const routes: Routes = [
  {
    path: 'auth', component: LayoutComponent, children:
    [
      {path : '', redirectTo : 'signin', pathMatch: 'full'},
      {
        path: 'signin',
        canActivate: [NonAuthGuard],
        component: SigninComponent
      }
    ]
  }
];
