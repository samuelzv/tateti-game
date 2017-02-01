import { Injectable } from '@angular/core';

const USER_NAME_KEY = 'username';

@Injectable()
export class LoginService {
  private storage;

  constructor() {
    this.storage = localStorage;
  }

  isLoggedin() {
    return this.storage.getItem(USER_NAME_KEY) ? true : false;
  }

  login(username) {
    this.storage.setItem(USER_NAME_KEY, username)
  }

  logout() {
    this.storage.removeItem(USER_NAME_KEY)
  }

}
