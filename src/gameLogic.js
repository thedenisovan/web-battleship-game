export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.isLive = true;
  }
  hit() {
    this.hits++;
    this.#isSunk();
    if (!this.isLive) {
      return 'You did sunk the ship.';
    } else {
      return 'You did hit the ship.'
    }
  }
  // Helper function which sets ship to sunken
  #isSunk() {
    if (this.hits >= this.length) {
      this.isLive = false;
    }
  }
}

export class GameBoard {
  constructor() {
    this.board = this.#generateBoard();
  }
  // Creates 2d game board
  #generateBoard() {
    const FIELD_LENGTH = 10;
    let board = [];
    for (let i = 0; i < FIELD_LENGTH; i++) {
      board[i] = [];
      for (let j = 0; j < FIELD_LENGTH; j++) {
        board[i][j] = null;
      }
    }
    return board;
  }
}