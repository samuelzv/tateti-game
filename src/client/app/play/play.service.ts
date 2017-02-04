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
import { Tile } from './../shared/interfaces';

@Injectable()
export class PlayService implements OnInit {
  private subject: Subject<Game>;
  private state: Game;
  private algorithm: GameAlgorithm;
  private nextComputerMovement: number;

  constructor() {
    this.algorithm = new BasicAlgorithmService();
  }
  ngOnInit() {
  }

  getInitialState(): Game {
    let arr = Array(9).fill(null);

    let game: Game = {
      tiles: arr.map(()=><Tile>{value:PlayItemValue.UNSET, isWinnerTile: false}),
      turn: Contender.PERSON,
      playState: PlayState.PLAYING,
      winner: Winner.NOT_YET
    };

    return game;
  }

  newGame(): Subject<Game> {
    this.subject = new Subject();
    return this.subject;
  }

  start(): void {
    if(this.nextComputerMovement) { clearTimeout(this.nextComputerMovement); }

    this.state = this.getInitialState();
    this.subject.next(this.state);
  }

  setState(newState: any): void {
    this.state =  Object.assign({}, this.state, newState);
    this.subject.next(this.state);
  }


  checkIfWin(tiles:Tile[], turn:any): number[] {
    let searchedValue = (turn === Contender.COMPUTER) ? PlayItemValue.COMPUTER : PlayItemValue.PERSON;
    let matches = 0;
    let winnerTiles: number[] = [];

    for(let index=0; index < tiles.length; index++) {

      if (tiles[index].value === searchedValue) {
        winnerTiles.push(index);
        matches += 1;
      }
      if (matches === 3) {
        return winnerTiles;
      }

      if ((index + 1) % 3 === 0) {
        matches = 0;
        winnerTiles = [];
      }
    }

    return [];
  }

  selectTile(tileIndex: number): void {
    this.takeTile(tileIndex, PlayItemValue.PERSON);

    this.nextComputerMovement = setTimeout(()=> {
      if(this.state.playState !== PlayState.GAME_OVER) {
        this.takeTile(this.algorithm.chooseTile(this.state), PlayItemValue.COMPUTER);
      }
    }, 2000);
  }


  takeTile(tileIndex, value: string) {
    let winner:Winner = this.state.winner;
    let tiles: Tile[] = [].concat(this.state.tiles);
    let turn = this.state.turn;
    let playState: PlayState;

    tiles[tileIndex].value = value;

    let winnerTiles: number[] = this.checkIfWin(tiles, turn);
    if(winnerTiles.length) {
      // mark winner tiles
      winnerTiles.forEach((index: number)=> tiles[index].isWinnerTile = true );
      // who is the winner
      winner = (turn === Contender.PERSON) ? Winner.PERSON : Winner.COMPUTER;
      // game over
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

  isAllTilesTaken(tiles:Tile[]): boolean {
    let unsetTiles = tiles.filter((tile:Tile) => tile.value === PlayItemValue.UNSET );
    return unsetTiles.length == 0;
  }



}
