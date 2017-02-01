import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../../common/services/loggin.service';

@Component({
    selector: 'tate-play',
    moduleId: module.id,
    templateUrl: 'play.template.html',
    styleUrls: ['play.component.css']
})
export class PlayComponent  implements OnInit {
    constructor(public loginService: LoginService, public router: Router) {
    }

    ngOnInit() {
        if(!this.loginService.isLoggedin()) {
            this.router.navigate(['register']);
        }
    }
}

