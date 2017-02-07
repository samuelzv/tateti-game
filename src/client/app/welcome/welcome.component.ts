import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { LoginService } from './../shared/services/loggin.service';
import { AppStore, LoginInfo } from './../shared/models/index';

@Component({
    selector: 'tate-welcome',
    moduleId: module.id,
    templateUrl: 'welcome.template.html',
    styleUrls: ['welcome.component.css']
})
export class WelcomeComponent  {
    state: {
        login: LoginInfo ;
    };

    constructor(private router: Router,
                private store: Store<AppStore>,
                private loginService: LoginService) {
        store.select('login').subscribe((loginInfo: LoginInfo) => {
            this.state = {login : loginInfo};
        });

        // try to get the username of the storage
        let username = this.loginService.getUsername();
        if (username) {
            this.loginService.login(username);
        }
    }

    play() {
        let route: string = 'play';

        if (!this.state.login) {
            route = 'register';
        }

        this.router.navigate([route]);
    }

}

