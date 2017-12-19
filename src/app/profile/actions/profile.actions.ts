import { Action } from '@ngrx/store';
import { User } from '../../core/models/user';

export const SAVE = '[Profile] Saves user profile';

/**
 * Saves profile
 */
export class Save implements Action {
  readonly type = SAVE;

  constructor(public payload: User) {

  }
}

export type All = Save;
