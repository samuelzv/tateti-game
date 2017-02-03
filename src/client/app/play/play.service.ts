import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Game, GameAlgorithm } from '../shared/interfaces';
import { BasicAlgorithmService } from './basic-algorithm.service';

import {
  Contender,
  PlayState,
  PlayItemValue,
  Winner
} from './../shared/constants';

@Injectable()
export class PlayService implements OnInit {
  private subject: Subject<Game>;
  private state: Game;
  private algorithm: GameAlgorithm;

  constructor() {
    this.algorithm = new BasicAlgorithmService();
  }
  ngOnInit() {
  }

  getInitialState(): Game {
    let game: Game = {
      tiles: Array(9).fill(PlayItemValue.UNSET),
      turn: Contender.PERSON,
      playState: PlayState.PLAYING,
      winner: Winner.NOT_YET
    };

    return game;
  }

  newGame(): Subject<Game> {
    if(this.subject) {
      debugger;
      this.subject.unsubscribe();
    }

    this.subject = new Subject();
    return this.subject;
  }

  start(): void {
    this.state = this.getInitialState();
    this.subject.next(this.state);
  }

  setState(newState: any): void {
    this.state =  Object.assign({}, this.state, newState);
    this.subject.next(this.state);
  }


  checkIfWin(tiles:any, turn:any) {
    let searchedValue = (turn === Contender.COMPUTER) ? PlayItemValue.COMPUTER : PlayItemValue.PERSON;
    let matches = 0;

    for(let index=0; index < tiles.length; index++) {

      if (tiles[index] === searchedValue) {
        matches += 1;
      }
      if (matches === 3) {
        return true;
      }

      if ((index + 1) % 3 === 0) {
        matches = 0;
      }
    }

    return false;
  }

  selectTile(tileIndex: number): void {
    this.takeTile(tileIndex, PlayItemValue.PERSON);

    setTimeout(()=> {
      if(this.state.playState !== PlayState.GAME_OVER) {
        this.takeTile(this.algorithm.chooseTile(this.state), PlayItemValue.COMPUTER);
      }
    }, 2000);
  }


  takeTile(tileIndex, value: string) {
    let winner:Winner = this.state.winner;
    let tiles = [].concat(this.state.tiles);
    let turn = this.state.turn;
    let playState: PlayState;

    tiles[tileIndex] = value;

    if(this.checkIfWin(tiles, turn)) {
      winner = (turn === Contender.PERSON) ? Winner.PERSON : Winner.COMPUTER;
      playState = PlayState.GAME_OVER;
    } else {
      if(this.isAllTilesTaken(tiles)) {
        playState = PlayState.GAME_OVER;
        winner = Winner.TIE;
      }
      // move to nex turn
      turn = (turn === Contender.PERSON) ? Contender.COMPUTER : Contender.PERSON;
    }
    this.setState({tiles, playState, turn, winner});
  }

  isAllTilesTaken(tiles:any): boolean {
    let unsetTiles = tiles.filter(tile => tile === PlayItemValue.UNSET );
    return unsetTiles.length == 0;
  }



}
