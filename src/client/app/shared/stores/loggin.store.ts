import { ActionReducer, Action } from '@ngrx/store';
import { LoginInfo } from './../models/login-info.model';

export const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
};

export const login = (state: LoginInfo = null, action: Action ): LoginInfo => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return Object.assign({}, action.payload);

    case ACTIONS.LOGOUT:
      return null;

    default:
      return state;
  }
};

