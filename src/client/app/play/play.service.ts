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
  private nextComputerMovement: any;

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



  checkIfWin(tiles:Tile[], turn:Contender): number[] {
    let winnerCombination: number[];
    let winCombinations = [
      [0,1,2],[3,4,5],[6,7,8], /*horizontal*/
      [0,3,6],[1,4,7],[2,5,8], /* vertical */
      [0,4,8], [2,4,6] /* diagonal*/
    ];

    let searchedValue = (turn === Contender.COMPUTER) ? PlayItemValue.COMPUTER : PlayItemValue.PERSON;
    let win = winCombinations.some((combination: number[])=> {
      winnerCombination = combination;
      return combination.every((index:number)=> tiles[index].value === searchedValue);
    });
    return win ? winnerCombination : [];
  }

  selectTile(tileIndex: number): void {
    this.takeTile(tileIndex, PlayItemValue.PERSON);

    this.nextComputerMovement =  setTimeout(()=> {
      if(this.state.playState !== PlayState.GAME_OVER) {
        this.takeTile(this.algorithm.chooseTile(this.state), PlayItemValue.COMPUTER);
      }
    }, 2000);
  }


  takeTile(tileIndex, value: string) {
    let winner:Winner = this.state.winner;
    let tiles: Tile[] = [].concat(this.state.tiles);
    let turn = this.state.turn;
    let playState: PlayState = this.state.playState;

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
