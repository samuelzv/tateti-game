import { Game } from './game.model';

export interface GameAlgorithm {
  chooseTile(game: Game): number
}
