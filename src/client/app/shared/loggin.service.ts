import { Injectable } from '@angular/core';

const USER_NAME_KEY = 'username';

@Injectable()
export class LoginService {
  private storage;

  constructor() {
    this.storage = localStorage;
  }

  isLoggedin() {
    return this.getUsername() ? true : false;
  }

  login(username) {
    this.storage.setItem(USER_NAME_KEY, username);
    return Promise.resolve(true);
  }

  getUsername(): string {
    return this.storage.getItem(USER_NAME_KEY);
  }

  logout() {
    this.storage.removeItem(USER_NAME_KEY)
  }

}
