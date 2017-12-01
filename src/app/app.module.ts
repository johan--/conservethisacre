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

bootstrap4Mode();

export function tokenGetter() {
  return typeof localStorage != 'undefined' ? localStorage.getItem('access_token') : '';
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
      config: {tokenGetter, whitelistedDomains: ['localhost:3001']}
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
