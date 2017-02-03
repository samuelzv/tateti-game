import { Game, GameAlgorithm } from '../shared/interfaces';
import { PlayItemValue } from '../shared/constants';

export class BasicAlgorithmService  implements GameAlgorithm   {
  constructor() {}

  public chooseTile(game:Game): number {
    let availableIndexes = [];

    game.tiles.forEach((tile, index)=> {
      if(tile === PlayItemValue.UNSET) {
        availableIndexes.push(index);
      }
    });

    let selectedIndex = this.getRandomInteger(0, availableIndexes.length);
    return availableIndexes[selectedIndex];
  }

  private getRandomInteger(min : number, max : number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

}