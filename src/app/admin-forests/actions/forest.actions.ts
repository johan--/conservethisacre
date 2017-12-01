import { Action } from '@ngrx/store';
import { IForest } from '../../core/models/forest';

export const FIND = '[Forests] Requests forests from server';
export const SET = '[Forests] Sets forests to state';
export const DELETE = '[Forests] Delete forest';
export const SAVE = '[Forests] Saves forest or create new';

/**
 * Requests forests list
 */
export class Find implements Action {
  readonly type = FIND;
}

/**
 * Sets forests data
 */
export class Set implements Action {
  readonly type = SET;

  constructor(public payload: IForest[]) {
  }
}

/**
 * Deletes forest entry
 */
export class Delete implements Action {
  readonly type = DELETE;

  constructor(public payload: IForest) {
  }
}

/**
 * Saves or create new forest entry
 */
export class Save implements Action {
  readonly type = SAVE;

  constructor(public payload: Partial<IForest>) {
  }
}


export type All = Find | Set | Delete | Save;
