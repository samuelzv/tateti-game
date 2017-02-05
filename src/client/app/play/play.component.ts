import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MdSnackBar, MdSnackBarRef} from '@angular/material';

import { LoginService } from './../shared/loggin.service';
import { PlayService } from './play.service';
import { Contender, PlayState, Winner } from './../shared/constants';
import { Game } from './../shared/models/index';


@Component({
    selector: 'tate-play',
    moduleId: module.id,
    templateUrl: 'play.template.html',
    styleUrls: ['play.component.css']
})
export class PlayComponent  implements OnInit {
    titleStatus: string;
    titleAction: string;
    fixedRowHeight = 100;
    gameSubscription: any;
    game: Game;
    snackBarRef: MdSnackBarRef<any>;
    username: string;
    EnumPlayState: any = PlayState;

    constructor(public loginService: LoginService,
                public router: Router,
                public playService: PlayService,
                public snackBar: MdSnackBar) {
    }

    ngOnInit() {
        if(!this.loginService.isLoggedin()) {
            this.router.navigate(['register']);
        }
        this.username = this.loginService.getUsername();
        this.gameSubscription = this.playService.getGameSubscription();

        this.gameSubscription.subscribe((game: Game)=> {
            this.onGameUpdate(game);
        });

        this.newGame();
    }

    selectTile(tileIndex: number) {
        if(this.game.playState === PlayState.PLAYING && this.game.turn === Contender.PERSON) {
           this.playService.selectTile(tileIndex);
        }
    }

    onGameUpdate(game: Game) {
        this.game = game;

        if(this.game.winner !== Winner.NOT_YET) {
            this.titleStatus = 'Game Over';
            this.titleAction = 'New game';

            let toastMessage = '';
            switch(this.game.winner) {
                case Winner.COMPUTER:
                    toastMessage = 'You lose';
                    break;

                case Winner.PERSON:
                    toastMessage = 'You win!';

                    break;
                case Winner.TIE:
                    toastMessage = 'Tie';
                    break;
            }
            this.snackBarRef =this.snackBar.open(toastMessage);
        }else {
            this.titleStatus = (this.game.turn === Contender.COMPUTER) ? 'Thinking...' : 'Your turn';
        }
    }

    newGame() {
        // cleanup
        this.titleAction = 'Reset game';
        if(this.snackBarRef) {
            this.snackBarRef.dismiss();
        }

        this.playService.start(this.username);
    }


}

