import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

const USER_NAME_KEY = 'username';

@Injectable()
export class LoginService {

  constructor(private storageService: StorageService) {
  }

  isLoggedin() {
    return this.getUsername() ? true : false;
  }

  login(username) {
    this.storageService.save(USER_NAME_KEY, username);
    return Promise.resolve(true);
  }

  getUsername(): string {
    return this.storageService.get(USER_NAME_KEY);
  }

  logout() {
  }

}
