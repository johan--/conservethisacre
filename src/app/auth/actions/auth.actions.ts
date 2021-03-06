import { Action } from '@ngrx/store';
import { User } from '../../core/models/user';
import { Creadentials } from '../models/credentials';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_SUCCESS = '[Auth] Login success';
export const LOGIN_FAILED = '[Auth] Login failed';
export const VERIFY = '[Auth] Verify authentication';
export const SET_USER = '[Auth] Sets user data';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: Creadentials) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: User) {
  }
}

export class SetUser implements Action {
  readonly type = SET_USER;

  constructor(public payload: User) {
  }
}


export class LoginFailed implements Action {
  readonly type = LOGIN_FAILED;
}

export class Verify implements Action {
  readonly type = VERIFY;

  constructor(public payload: string) {
  }
}

export type All = Login | LoginSuccess | LoginFailed | Verify | SetUser;
