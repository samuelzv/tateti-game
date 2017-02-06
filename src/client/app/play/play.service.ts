import { Injectable, OnInit } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppStore, Game, GameAlgorithm, Tile } from '../shared/models/index';
import { BasicAlgorithmService } from './basic-algorithm.service';
import { ScoreService } from '../shared/services/score.service';
import { ACTIONS as GAME_ACTIONS} from '../shared/stores/game.store';

import {
  Contender,
  PlayState,
  PlayItemValue,
  Winner
} from './../shared/constants';

@Injectable()
export class PlayService implements OnInit {
  private algorithm: GameAlgorithm;

  constructor(private scoreService: ScoreService ) {
    this.algorithm = new BasicAlgorithmService();
  }

  ngOnInit() {}

  getInitialState(username: string): Game {
    let arr = Array(9).fill(null);

    let game: Game = {
      username,
      tiles: arr.map(()=><Tile>{value:PlayItemValue.UNSET, isWinnerTile: false}),
      turn: Contender.PERSON,
      playState: PlayState.PLAYING,
      winner: Winner.NOT_YET,
      isPristine: true
    };

    return game;
  }

  selectTile(tileIndex: number, game: Game): Action {
      tileIndex = (game.turn === Contender.PERSON) ?  tileIndex : this.algorithm.chooseTile(game);
      return this.takeTile(tileIndex, game);
  }

  private checkIfWin(tiles:Tile[], turn:Contender): number[] {
    let winnerCombination: number[] = [];
    let winCombinations = [
      [0,1,2],[3,4,5],[6,7,8], /*horizontal*/
      [0,3,6],[1,4,7],[2,5,8], /* vertical */
      [0,4,8],[2,4,6]           /* diagonal*/
    ];

    let searchedValue = this.getTileValueByTurn(turn);
    let win = winCombinations.some((combination: number[])=> {
      winnerCombination = combination;
      return combination.every((index:number)=> tiles[index].value === searchedValue);
    });
    return win ? winnerCombination : [];
  }

  private getTileValueByTurn(turn: Contender) {
    return (turn === Contender.PERSON)? PlayItemValue.PERSON : PlayItemValue.COMPUTER;
  }

  private takeTile(tileIndex, game: Game): Action {
    let value = this.getTileValueByTurn(game.turn);
    let winner:Winner = game.winner;
    let tiles: Tile[] = [].concat(game.tiles);
    let action: Action =  null;

    tiles[tileIndex].value = value;
    let winnerTiles: number[] = this.checkIfWin(tiles, game.turn);

    if(winnerTiles.length) {
      // mark winner tiles
      winnerTiles.forEach((index: number)=> tiles[index].isWinnerTile = true );
      // who is the winner
      winner = (game.turn === Contender.PERSON) ? Winner.PERSON : Winner.COMPUTER;
      this.scoreService.increment(game.username, winner);
      action = {type:GAME_ACTIONS.WIN, payload: {tiles}};
    } else {
      if(this.isAllTilesTaken(tiles)) {
        this.scoreService.increment(game.username, Winner.TIE);
        action = {type: GAME_ACTIONS.TIE, payload:{}};
      } else {
        action = {type: GAME_ACTIONS.MOVE, payload:{}};
      }
    }
    return action;
  }

  private isAllTilesTaken(tiles:Tile[]): boolean {
    let unsetTiles = tiles.filter((tile:Tile) => tile.value === PlayItemValue.UNSET );
    return unsetTiles.length == 0;
  }

}
