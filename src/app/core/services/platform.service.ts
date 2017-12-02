import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';


@Injectable()
export class PlatformService {

  /**
   * Default constructor
   * @param platformId
   */
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  /**
   * Returns if we are working with browser platform
   * @return {boolean}
   */
  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  /**
   * Returns if we are at server
   * @return {boolean}
   */
  isServer() {
    return isPlatformServer(this.platformId);
  }
}
