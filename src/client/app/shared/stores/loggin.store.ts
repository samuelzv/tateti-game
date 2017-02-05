import { ActionReducer, Action } from '@ngrx/store';
import { LoginInfo } from './../models/login-info.model';

export const ACTIONS = {
  LOGGED_IN: 'LOGGED-IN',
  LOGGED_OUT: 'LOGGED-OUT'
};

export const login = (state: any = null, action: Action ): LoginInfo => {
  switch (action.type) {
    case ACTIONS.LOGGED_IN:
      return Object.assign({}, action.payload);

    case ACTIONS.LOGGED_OUT:
      return null;

    default:
      return state;
  }
};

