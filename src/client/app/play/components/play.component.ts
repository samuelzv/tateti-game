import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../../common/services/loggin.service';
import { PlayService } from './../../common/services/play.service';

@Component({
    selector: 'tate-play',
    moduleId: module.id,
    templateUrl: 'play.template.html',
    styleUrls: ['play.component.css']
})
export class PlayComponent  implements OnInit {
    tiles: any[];
    fixedRowHeight = 100;

    constructor(public loginService: LoginService, public router: Router, public playService: PlayService) {
    }

    ngOnInit() {
        if(!this.loginService.isLoggedin()) {
            this.router.navigate(['register']);
        }
        this.tiles = this.playService.newGame();
    }
}

