import {
  Contender,
  PlayState,
  Winner
} from './constants';

export interface Game {
  tiles: string[],
  turn: Contender,
  playState: PlayState
  winner: Winner
}

export interface GameAlgorithm {
  chooseTile(game: Game): number
}

export interface Score {
  username: string,
  person: number,
  computer: number
}
