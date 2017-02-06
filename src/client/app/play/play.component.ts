import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MdSnackBar, MdSnackBarRef} from '@angular/material';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

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
    //loginInfo: LoginInfo;
    titleStatus: string;
    titleAction: string;
    fixedRowHeight = 100;
    //gameSubscription: any;
    game: Game;
    snackBarRef: MdSnackBarRef<any>;
    EnumPlayState: any = PlayState;
    //observers:{
    //    login : Observable<LoginInfo>,
    //    game  : Observable<Game>
    //};

    constructor(public router: Router,
                public playService: PlayService,
                public snackBar: MdSnackBar,
                private store: Store<AppStore>) {
        this.state = { login: null, game: null};
        //this.observers = {
        //    login: store.select('login'),
        //    game: store.select('game')
        //};

        store.select('login').subscribe((loginInfo: LoginInfo)=> {
            this.state.login = loginInfo;
        });

        store.select('game').subscribe((game: Game)=> {
            this.onGameUpdate(game);
        });

    }

    ngOnInit() {
       /*
        this.observers.login.subscribe((loginInfo: LoginInfo)=> {
            this.state.login = loginInfo;
        });

        this.observers.game.subscribe((game: Game)=> {
            this.onGameUpdate(game);
        });
        */

        this.newGame();
    }

    selectTile(tileIndex: number) {
       let action:Action = this.playService.selectTile(tileIndex, this.game);
       this.store.dispatch(action);

       this.nextComputerMovement =  setTimeout(()=> {
           if(this.game.playState !== PlayState.GAME_OVER) {
               let action:Action = this.playService.selectTile(null, this.game);
               this.store.dispatch(action);
           }
       }, 2000);
    }

    onGameUpdate(game: Game) {
        if(!game) { return; }

        this.game = game;

        this.titleAction = 'Reset game';
        if(game.isPristine) {
            this.cleanup();
        }

        if(this.game.winner !== Winner.NOT_YET) {
            if(this.nextComputerMovement) {
                clearTimeout(this.nextComputerMovement);
                this.nextComputerMovement = null;
            }

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

    cleanup() {
        if(this.snackBarRef) {
            this.snackBarRef.dismiss();
        }
    }

    newGame() {
        this.store.dispatch({
            type: GAME_ACTIONS.NEW,
            payload: this.playService.getInitialState(this.state.login.username)
        });
    }


}

