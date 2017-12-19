import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2, ViewEncapsulation } from '@angular/core';
// import { PlatformState } from '@angular/platform-server';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import { isPlatformBrowser } from '@angular/common';
import { user_UserId } from 'aws-sdk/clients/alexaforbusiness';
import 'rxjs/add/operator/do';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

export interface DynamicScriptLoaderOptions {
  // Uses callback parameter as script loaded hook. If false, just handle <script> load event
  callback?: boolean;
}

@Injectable()
export class DynamicScriptLoaderService {

  scripts = {};

  /**
   * Reference to head element
   */
  headElement: HTMLHeadElement;

  renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2, @Inject(PLATFORM_ID) private platformId) {
    // TEMP
    if (isPlatformBrowser(platformId)) {
      this.renderer = rendererFactory.createRenderer(document, {
        id: '-1',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        data: {}
      });

      this.headElement = document.getElementsByTagName('head')[0];
    }
  }


  /**
   * Loads script by provided external URL
   * @TODO: Handle errors when loading script
   */
  load(url: string, options?: DynamicScriptLoaderOptions): Observable<boolean> {
    // TEMP
    if (!isPlatformBrowser(this.platformId)) {
      return Observable.of(true);
    }

    // cache initial url name, as it could be changed by adding callback
    const urlKey = url;

    if (this.scripts[urlKey]) {
      return this.scripts[urlKey];
    }

    options = options || {};
    const subject = new Subject<boolean>();

    // Caching observable on script load
    this.scripts[urlKey] = subject;

    const renderer = this.renderer;
    const scriptElement = renderer.createElement('script');

    if (options.callback) {
      url += (url.indexOf('?') == -1 ? '?' : '&') + 'callback=' + this.buildCallbackFunction(subject);
    }

    renderer.setAttribute(scriptElement, 'src', url);
    renderer.listen(scriptElement, 'load', () => {
      /// TODO: If we already loaded script, and then try to load it again - it will return Observable
      /// but it will not be possible to get already emitted value. May be replace it with bahaviorsubject
      /// or return Observale | true
      if (!options.callback) {
        subject.next(true);
      }
    });

    // replaces cached script observable with true
    const resolveFn = () => this.scripts[urlKey] = true;

    renderer.appendChild(this.headElement, scriptElement);

    return subject.do(resolveFn);
  }


  private buildCallbackFunction(subject: Subject<boolean>) {
    const name = 'dsl_' + (+new Date);
    window[name] = () => {console.log('callback');subject.next(true);}

    return name;
  }
}
