import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MdSnackBar} from '@angular/material';

import { LoginService } from './../shared/loggin.service';
import { PlayService } from './play.service';
import { Contender, PlayState, Winner } from './../shared/constants';
import { Game } from './../shared/interfaces';


@Component({
    selector: 'tate-play',
    moduleId: module.id,
    templateUrl: 'play.template.html',
    styleUrls: ['play.component.css']
})
export class PlayComponent  implements OnInit {
    titleStatus: string;
    fixedRowHeight = 100;
    gameSubscription: any;
    game: Game;

    constructor(public loginService: LoginService,
                public router: Router,
                public playService: PlayService,
                public snackBar: MdSnackBar) {
    }

    ngOnInit() {
        if(!this.loginService.isLoggedin()) {
            this.router.navigate(['register']);
        }
        this.gameSubscription = this.playService.newGame();

        this.gameSubscription.subscribe((game: Game)=> {
            this.onGameUpdate(game);
        });

        this.playService.start();
    }

    selectTile(tileIndex: number) {
        if(this.game.playState !== PlayState.GAME_OVER) {
           this.playService.selectTile(tileIndex);
        }
    }

    onGameUpdate(game: Game) {
        this.game = game;

        if(this.game.playState === PlayState.GAME_OVER) {
            this.titleStatus = 'Game Over!'
        }else {
            this.titleStatus = (this.game.turn === Contender.COMPUTER) ? 'Computer thinking' : 'Your turn';
        }

        switch(this.game.winner) {
            case Winner.COMPUTER:
                this.snackBar.open('Computer wins!');
                break;

            case Winner.PERSON:
                this.snackBar.open('You win!');
                break;

            case Winner.TIE:
                this.snackBar.open('Tie!!');
                break;
        }

    }


}

