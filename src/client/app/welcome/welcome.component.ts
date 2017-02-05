import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../shared/services/loggin.service';

@Component({
    selector: 'tate-welcome',
    moduleId: module.id,
    templateUrl: 'welcome.template.html',
    styleUrls: ['welcome.component.css']
})
export class WelcomeComponent  {
    constructor(public router: Router,
                private loginService: LoginService) {

        // try to get the username of the storage
        let username = this.loginService.getUsername();

        if(!username) {
            this.router.navigate(['register'])
        } else {
            // login with the storage user
            this.loginService.login(username);
        }
    }

    play() {
        this.router.navigate(['play']);
    }
}

