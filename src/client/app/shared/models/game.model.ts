import { Tile } from './tile.model';
import { Contender, PlayState, Winner } from './../constants';

export interface Game {
  username: string,
  tiles: Tile[],
  turn: Contender,
  playState: PlayState
  winner: Winner,
  isPristine: boolean
}