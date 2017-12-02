import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
 * Used for loading 3rd party JS code
 */
@Injectable()
export class ScriptLoaderService {
  /**
   * Hash map flags what URLs have been already loaded
   */
  loaded: { [key: string]: boolean } = {};

  /**
   * Loads script specified by URL
   * @param {string} url
   */
  load(url: string): Observable<boolean> {
    const subject = new Subject<boolean>();

    if (this.loaded[url]) {
      setTimeout(() => subject.next(true), 0);
      return subject;
    }

    const head = document.getElementsByTagName('head')[0];
    const scriptElem = document.createElement('script');

    scriptElem.src = url;
    head.appendChild(scriptElem);

    scriptElem.onload = () => {
      this.loaded[url] = true;
      subject.next(true);
    };

    scriptElem.onerror = err => subject.error(err);

    return subject;
  }
}
