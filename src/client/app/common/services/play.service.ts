import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class PlayService implements OnInit {
  tiles: any[];

  constructor() {
  }

  ngOnInit() {

  }

  newGame() {
    return this.initializeGame();
  }

  initializeGame() {
    this.tiles = Array(9).fill('');
    return this.tiles;
  }


}
