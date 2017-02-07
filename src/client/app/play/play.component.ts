import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MdSnackBar, MdSnackBarRef} from '@angular/material';
import { Store, Action } from '@ngrx/store';

import { PlayService } from './play.service';
import { Contender, PlayState, Winner } from './../shared/constants';
import { Game, AppStore, LoginInfo } from './../shared/models/index';
import { ACTIONS as GAME_ACTIONS} from '../shared/stores/game.store';


@Component({
    selector: 'tate-play',
    moduleId: module.id,
    templateUrl: 'play.template.html',
    styleUrls: ['play.component.css']
})
export class PlayComponent  implements OnInit {
    state: {
        login: LoginInfo,
        game: Game
    };
    private nextComputerMovement: any;
    titleStatus: string;
    titleAction: string;
    fixedRowHeight = 100;
    game: Game;
    snackBarRef: MdSnackBarRef<any>;
    EnumPlayState: any = PlayState;

    constructor(public router: Router,
                public playService: PlayService,
                public snackBar: MdSnackBar,
                private store: Store<AppStore>) {
        this.state = { login: null, game: null};
        store.select('login').subscribe((loginInfo: LoginInfo) => {
            this.state.login = loginInfo;
        });

        store.select('game').subscribe((game: Game) => {
            this.onGameUpdate(game);
        });

        router.events.subscribe(() => {
            this.cleanNotification();
        });

    }

    ngOnInit() {
        this.newGame();
    }

    selectTile(tileIndex: number) {
       let action: Action = this.playService.selectTile(tileIndex, this.game);
        if (action) {
            this.store.dispatch(action);
        }

       this.nextComputerMovement =  setTimeout(() => {
           if (this.game.playState !== PlayState.GAME_OVER) {
               let action: Action = this.playService.selectTile(null, this.game);
               if (action) {
                   this.store.dispatch(action);
               }
           }
       }, 2000);
    }

    clearNextMovement() {
        if (this.nextComputerMovement) {
            clearTimeout(this.nextComputerMovement);
            this.nextComputerMovement = null;
        }
    }

    onGameUpdate(game: Game) {
        if (!game) { return; }

        this.game = game;

        this.titleAction = 'Reset game';
        if (game.isPristine) {
            this.cleanNotification();
        }

        if (this.game.winner !== Winner.NOT_YET) {
            this.clearNextMovement();
            this.titleStatus = 'Game Over';
            this.titleAction = 'New game';

            let toastMessage = '';
            switch (this.game.winner) {
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
            this.snackBarRef = this.snackBar.open(toastMessage);
        }else {
            this.titleStatus = (this.game.turn === Contender.COMPUTER) ? 'Thinking...' : 'Your turn';
        }
    }

    cleanNotification() {
        if (this.snackBarRef) {
            this.snackBarRef.dismiss();
        }
    }

    newGame() {
        this.clearNextMovement();
        this.store.dispatch({
            type: GAME_ACTIONS.NEW,
            payload: this.playService.getInitialState(this.state.login.username)
        });
    }


}

