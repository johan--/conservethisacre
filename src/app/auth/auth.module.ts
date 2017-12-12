import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './containers/signin/signin.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { LayoutComponent } from './components/layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { AuthService } from './services/auth.service';
import { TokenStorage } from './services/token.storage';
import { AuthGuard } from './guards/auth.guard';
import { VerifyResolve } from './resolves/verify.resolve';
import { NonAuthGuard } from './guards/non-auth.guard';
import { FacebookService } from './services/facebook.service';
import { TokenGuard } from './guards/token.guard';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    // RouterModule,

    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [AuthService, TokenStorage, AuthGuard, VerifyResolve, NonAuthGuard, FacebookService, TokenGuard],
  declarations: [SigninComponent, LayoutComponent]
})
export class AuthModule { }
