import {
  Contender,
  PlayState,
  Winner
} from './constants';

export interface Game {
  username: string,
  tiles: Tile[],
  turn: Contender,
  playState: PlayState
  winner: Winner,
  isPristine: boolean
}

export interface GameAlgorithm {
  chooseTile(game: Game): number
}


export interface Tile {
  value: string,
  isWinnerTile: boolean
}

export interface RecordScore {
  username: string,
  won: number,
  tied: number,
  lost: number
}

export interface Storage {
  get(key:string): any;
  save(key:string, item: any): void;
}


