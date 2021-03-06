import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ModalModule } from 'ngx-modialog';
import { bootstrap4Mode, BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthModule } from './auth/auth.module';
import { LightboxModule } from 'angular2-lightbox';
import { FormErrorModule } from 'ngx-form-error';
import { SetupModule } from './setup/setup.module';

bootstrap4Mode();

export function tokenGetter() {
  return typeof localStorage != 'undefined' ? localStorage.getItem('token') : '';
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId : 'conserve'}),
    CoreModule,
    AuthModule,
    RouterModule.forRoot(routes),

    ModalModule.forRoot(),
    BootstrapModalModule,

    LightboxModule,
    FormErrorModule.forRoot(),

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),

    // CacheModule.forRoot(),
    // BrowserCacheModule.forRoot([
    //   {
    //     provide: CACHE,
    //     useClass: LocalStorageCacheService
    //   }
    // ]),

    JwtModule.forRoot({
      config: {tokenGetter, whitelistedDomains: ['localhost:3001', 'localhost:3000']}
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
