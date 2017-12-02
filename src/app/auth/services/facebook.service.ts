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

/// TEMP
declare var FB: any;
let JSScript;

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
          appId: '573983026276728', // App ID
          cookie: true, // enable cookies to allow the server to access the session
          xfbml: false,  // parse XFBML
          version: 'v2.9'
        });
      })
      .mapTo({loaded: true});

    // const fn = (d: any, s: any, id: any): Promise<any> => {
    //   return new Promise((resolve, reject) => {
    //     if (JSScript) {
    //       return resolve({loaded: true, loading: false, error: undefined})
    //     }
    //     let js: HTMLScriptElement;
    //     const fjs = d.getElementsByTagName(s)[0];
    //     if (d.getElementById(id)) {
    //       return
    //     }
    //     js = d.createElement(s);
    //     js.id = id;
    //     js.src = '//connect.facebook.net/en_US/sdk.js';
    //     fjs.parentNode.insertBefore(js, fjs);
    //     js.onload = (ev) => this.zone.run(() => {
    //       JSScript = js
    //       this.initFB()
    //       resolve({loaded: true, loading: false, error: undefined})
    //     })
    //     js.onerror = (err) => resolve({loaded: false, loading: false, error: err})
    //   });
    // }
    // const promise = fn(document, 'script', 'facebook-jssdk')
    // return Observable.fromPromise(promise).catch((err, caught) => Observable.of(false));
  }

  private initFB() {
    window['fbAsyncInit'] = () => {
      window['FB'].init({
        appId: '573983026276728', // App ID
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: false,  // parse XFBML
        version: 'v2.9'
      });
      // Additional initialization code here
    };
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
