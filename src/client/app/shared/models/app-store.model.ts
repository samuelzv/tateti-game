import { LoginInfo } from './login-info.model';
import { Game } from './game.model';

export interface AppStore {
  login: LoginInfo,
  game: Game
}