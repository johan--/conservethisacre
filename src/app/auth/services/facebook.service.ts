import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/distinctUntilChanged';
import { PlatformService } from '../../core/services/platform.service';
import { never } from 'rxjs/observable/never';
import { ScriptLoaderService } from '../../core/services/script-loader.service';
import 'rxjs/add/operator/mapTo';
import { environment } from '../../../environments/environment';

/// TEMP
declare var FB: any;

@Injectable()
export class FacebookService {
  /**
   * Handler that will unsubscribe all registered subscription
   * @type {Subject<void>}
   */
  unsubscribe = new Subject<void>();

  // Shows if FB SDK is laoded or not
  // Can be used outside the module to draw Loading status of button
  public FBLoadStatus$ = (): Observable<any> => {
    if (this.platformService.isServer()) {
      return never();
    }

    return this.scriptLoader.load('//connect.facebook.net/en_US/sdk.js?version=v2.9')
      .do(() => {
        window['FB'].init({
          appId: environment.facebookAppId, // App ID
          cookie: true, // enable cookies to allow the server to access the session
          xfbml: false,  // parse XFBML
          version: 'v2.9'
        });
      })
      .mapTo({loaded: true});
  }

  /**
   * Default constructor
   */
  constructor(private zone: NgZone, private platformService: PlatformService, private scriptLoader: ScriptLoaderService) {
  }

  /**
   * Checks current status of facebook login and returns observable on response
   * @param callback
   * @return {any}
   */
  getLoginStatus(): Observable<any> {
    return Observable.create((observer: Observer<any>) =>
      this.FBLoadStatus$().take(1).subscribe(e =>
        FB.getLoginStatus(res => this.zone.run(() => observer.next(res)))
      ));
  }

  /**
   * Preloads logged user loginDetails
   * @return {any}
   */
  getUserDetails(): Observable<any> {
    return Observable.create((observer: Observer<any>) =>
      this.FBLoadStatus$().take(1).subscribe(e =>
        FB.api('/me', res => this.zone.run(() => observer.next(res)))
      ));
  }

  /**
   * Log in using facebook
   */
  login(): Observable<any> {
    return Observable.create((observer: Observer<any>) =>
      this.FBLoadStatus$().take(1).subscribe(e =>
        FB.login(res => this.zone.run(() => observer.next(res)), {scope: 'public_profile,email,user_friends'})
      ));
  }
}
