import { ActionReducer, Action } from '@ngrx/store';
import { Game } from './../models/game.model';
import { Contender, PlayState, Winner } from './../../shared/constants';

export const ACTIONS = {
  NEW:  'GAME-NEW',
  RESET:'GAME-RESET',
  WIN:  'GAME-WIN',
  TIE: 'GAME-TIE',
  MOVE: 'GAME-MOVE'
};

export const game = (state: Game = null, action: Action ): Game => {

  switch (action.type) {
    case ACTIONS.NEW :
      return Object.assign({}, action.payload);

    case ACTIONS.MOVE :
      let turn: Contender = (state.turn === Contender.PERSON) ? Contender.COMPUTER : Contender.PERSON;
      return Object.assign({}, state, {turn, isPristine: false});

    case ACTIONS.WIN :
      // TODO
      // CAN REMOVE WINNER PROPERTY USING TURN
      let winner: Winner =  (state.turn === Contender.PERSON) ? Winner.PERSON : Winner.COMPUTER;
      return Object.assign({}, state,
                     { winner, tiles: action.payload.tiles, playState: PlayState.GAME_OVER });

    case ACTIONS.TIE:
      return  Object.assign({}, state,
        { winner: Winner.TIE, playState: PlayState.GAME_OVER });

    default:
      return state;
  }

};

