import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import { StorageService } from './storage.service';
import { ACTIONS } from './../stores/loggin.store';
import { AppStore, LoginInfo } from './../models/index';

const USER_NAME_KEY = 'username';

@Injectable()
export class LoginService {
  logging: Observable <any>;
  loginState: Observable<LoginInfo>;

  constructor(private storageService: StorageService, private store: Store<AppStore>) {
    this.loginState = store.select('login');
  }

  isLoggedin() {
    return this.getUsername() ? true : false;
  }

  login(username) {
    this.storageService.save(USER_NAME_KEY, username);
    let action = <Action>{type:ACTIONS.LOGGED_IN, payload: <LoginInfo>{username, lastLogin: new Date()} };
    this.store.dispatch(action);

    return Promise.resolve(true);
  }

  getUsername(): string {
    return this.storageService.get(USER_NAME_KEY);
  }

  logout() {
  }

}
