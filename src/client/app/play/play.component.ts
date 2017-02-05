import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MdSnackBar, MdSnackBarRef} from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PlayService } from './play.service';
import { Contender, PlayState, Winner } from './../shared/constants';
import { Game, AppStore, LoginInfo } from './../shared/models/index';
//import { LoginInfo } from './../shared/stores/loggin.store';


@Component({
    selector: 'tate-play',
    moduleId: module.id,
    templateUrl: 'play.template.html',
    styleUrls: ['play.component.css']
})
export class PlayComponent  implements OnInit {
    loginInfo: LoginInfo;
    titleStatus: string;
    titleAction: string;
    fixedRowHeight = 100;
    gameSubscription: any;
    game: Game;
    snackBarRef: MdSnackBarRef<any>;
    EnumPlayState: any = PlayState;
    loginState: Observable<LoginInfo>;

    constructor(public router: Router,
                public playService: PlayService,
                public snackBar: MdSnackBar,
                private store: Store<AppStore>) {
        this.loginState = store.select('login');
    }

    ngOnInit() {
        this.loginState.subscribe((loginInfo: LoginInfo)=> {
            this.loginInfo = loginInfo;
        });

        if(!this.loginInfo) {
            this.router.navigate(['welcome']);
        } else {
            this.gameSubscription = this.playService.getGameSubscription();

            this.gameSubscription.subscribe((game: Game)=> {
                this.onGameUpdate(game);
            });
            this.newGame();
        }
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

        this.playService.start(this.loginInfo.username);
    }


}

