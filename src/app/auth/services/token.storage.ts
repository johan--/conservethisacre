import { Injectable } from '@angular/core';

export const TOKEN_KEY = 'token';

@Injectable()
export class TokenStorage {

  localStorage;

  constructor() {

    // HACK FOR NOW
    if (typeof localStorage == 'undefined') {
      this.localStorage = {
        setItem: () => {
        },
        getItem: () => {
        },
        removeItem: () => {
        },
      } as any;
    }else{
      this.localStorage = localStorage;
    }
  }

  /**
   * Stores token to storage
   */
  setToken(token: string) {
    this.localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Removes token from cache
   */
  removeToken() {
    this.localStorage.removeItem(TOKEN_KEY);
  }

  /**
   * Returns token from storage
   */
  getToken() {
    return this.localStorage.getItem(TOKEN_KEY);
  }
}
