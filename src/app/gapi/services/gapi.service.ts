import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { DynamicScriptLoaderService } from '../../core/services/dynamic-script-loader.service';
import 'rxjs/add/operator/take';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { isPlatformBrowser } from '@angular/common';
import { fromPromise } from 'rxjs/observable/fromPromise';
import GoogleAuth = gapi.auth2.GoogleAuth;
import GoogleUser = gapi.auth2.GoogleUser;
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/delay';

const MAPS_URL = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${environment.googleMapsKey}`;

@Injectable()
export class GapiService {

  private MAPS_URL = '';

  /**
   * Observable hook when google auth api is initialized
   */
  initialize = new Subject<boolean>();

  /**
   * Google authorization api
   */
  auth: GoogleAuth;

  // maps: Google

  /**
   * Observable that emits when user is logged in
   * @type {Subject<void>}
   */
  private signIn$ = new Subject<boolean>();

  constructor(private dsl: DynamicScriptLoaderService, private zone: NgZone, @Inject(PLATFORM_ID) platformId) {
    // Only browser implementation. todo: pretify
    if (isPlatformBrowser(platformId)) {
      // dsl.load('https://apis.google.com/js/api.js').take(1).subscribe(() => {
      //   gapi.load('client:auth2', () => {
      //     gapi.auth2.init({
      //       client_id: environment.googleApiClientId,
      //       scope: 'profile email'
      //     }).then(() => {
      //       zone.run(() => {
      //         this.auth = gapi.auth2.getAuthInstance();
      //         this.initialize.next(true);
      //       });
      //     });
      //   });
      // });
    }
  }

  loadMapsApi(): Observable<boolean> {
    return this.dsl.load(MAPS_URL, {callback : true});
  }

  /**
   * Returns if gapi is initialized
   * @returns {boolean}
   */
  isInitialized() {
    return !!this.auth;
  }

  /**
   * Signs user in
   */
  signIn(): Observable<void> {
    const subject = new Subject<void>();
    this.auth.signIn().then(() => subject.next(), () => subject.error('Ooooops'));

    return subject;
  }

  /**
   * SIgns user out
   */
  signOut(): Observable<void> {
    const subject = new Subject<void>();
    this.auth.signOut().then(() => subject.next(), () => subject.error('Ooooops'));

    return subject;
  }

  /**
   * Checks if user is currently logged in
   */
  isSignedIn(): boolean {
    this.assertInitialized();
    return this.auth.isSignedIn.get();
  }

  /**
   * Returns currently signed in user
   * @returns {gapi.auth2.CurrentUser}
   */
  getCurrentUser(): GoogleUser {
    this.assertInitialized();
    return this.isSignedIn() ? this.auth.currentUser.get() : null;
  }

  /**
   * Returns authentication token
   */
  getAccessToken(): string {
    this.assertInitialized();
    return this.auth.currentUser.get().getAuthResponse().access_token;
  }

  /**
   * Returns one time authorization code
   * @returns {Observable<{code: string}>}
   */
  grantOfflineAccess(): Observable<{ code: string }> {
    return fromPromise(this.auth.grantOfflineAccess());
  }

  /**
   * Returns ID token
   * @returns {string}
   */
  getIdToken(): string {
    this.assertInitialized();
    return this.auth.currentUser.get().getAuthResponse().id_token;
  }

  private assertInitialized() {
    if (!this.auth) {
      throw new Error('GapiService is not initialized. You might attach to gapiService.initialize observable hook');
    }
  }
}
