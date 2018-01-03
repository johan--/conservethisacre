import { Action } from '@ngrx/store';
import { User } from '../../core/models/user';

export const FIND = '[Users] Requests users from server';
export const SET = '[Users] Sets users to state';
export const DELETE = '[Users] Delete user';
export const SAVE = '[Users] Saves user or create new';

/**
 * Requests users list
 */
export class Find implements Action {
  readonly type = FIND;
}

/**
 * Sets users data
 */
export class Set implements Action {
  readonly type = SET;

  constructor(public payload: User[]) {
  }
}

/**
 * Deletes user entry
 */
export class Delete implements Action {
  readonly type = DELETE;

  constructor(public payload: User) {
  }
}

/**
 * Saves or create new user entry
 */
export class Save implements Action {
  readonly type = SAVE;

  constructor(public payload: Partial<User>) {
  }
}


export type All = Find | Set | Delete | Save;
