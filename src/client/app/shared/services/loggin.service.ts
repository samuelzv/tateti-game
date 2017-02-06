import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';

import { StorageService } from './storage.service';
import { ACTIONS } from './../stores/loggin.store';
import { AppStore, LoginInfo } from './../models/index';

const USER_NAME_KEY = 'username';

@Injectable()
export class LoginService {

  constructor(private storageService: StorageService, private store: Store<AppStore>) {
  }

  login(username) {
    this.storageService.save(USER_NAME_KEY, username);

    let action = <Action>{type:ACTIONS.LOGIN, payload: <LoginInfo>{username, lastLogin: new Date()} };
    this.store.dispatch(action);

    return Promise.resolve(true);
  }

  getUsername(): string {
    return this.storageService.get(USER_NAME_KEY);
  }

  logout() {
    this.storageService.delete(USER_NAME_KEY);
    let action = <Action>{type:ACTIONS.LOGOUT} ;
    this.store.dispatch(action);
  }

}
