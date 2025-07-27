import { GameBoard } from './gameBoard.js';

export class Player {
  constructor() {
    this.gameBoard = new GameBoard();
  }
  randomIdx() {
    return Math.floor(Math.random() * 10);
  }
  direction() {
    return true ? this.randomIdx() > 5 : false;
  }
  // Places ships at random position
  randomPlacement() {
    let x = this.randomIdx();
    let y = this.randomIdx();
    const ships = [5, 4, 3, 3, 2];

    while (ships.length > 0) {
      let currentShip = ships.shift();

      // While coordinates are not legal change them and try again
      while (
        this.gameBoard.placeShip(currentShip, [x, y], this.direction()) === null
      ) {
        x = this.randomIdx();
        y = this.randomIdx();
      }
    }
  }
}

export class AiPlayer extends Player {
  constructor() {
    super();
  }
  // Generates computer attack
  computerMove(player) {
    let x = this.randomIdx();
    let y = this.randomIdx();
    let board = player.gameBoard.board;

    while (board[x][y] === 'o' || board[x][y] === 'x') {
      x = this.randomIdx();
      y = this.randomIdx();
    }
    player.gameBoard.receiveAttack(x, y);
  }
}
