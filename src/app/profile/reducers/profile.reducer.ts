import * as transactions from '../actions/profile.actions';

/**
 * Main State interface
 */
export interface State {
}

export const initialState: State = {}

/**
 * Main reducing function
 * @param {State} state
 * @param {All} action
 */
export function reducer(state = initialState, action: transactions.All): State {
  switch (action.type) {
  }
  return state;
}
