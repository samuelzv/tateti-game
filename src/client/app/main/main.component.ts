import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { LoginService } from './../shared/services/loggin.service';
import {LoginInfo, AppStore} from "../shared/models/index";

@Component({
  selector: 'tate-main',
  moduleId: module.id,
  templateUrl: 'main.template.html',
  styleUrls: ['main.component.css']
})
export class MainComponent  {
  observers: {
    login: Observable<LoginInfo>
  };
  state: {
    login: LoginInfo
  };

  constructor(private loginService: LoginService,
              private store: Store<AppStore>,
              private router: Router) {
    this.observers = {
      login: store.select('login')
    };
    this.state = {
      login: null
    };

    this.observers.login.subscribe((loginInfo: LoginInfo) => {
      this.state.login = loginInfo;

      if (!loginInfo ) {
        this.router.navigate(['welcome']);
      }
    });
  }

  logout() {
    this.loginService.logout();
  }
}
