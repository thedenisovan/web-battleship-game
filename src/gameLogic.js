export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.isLive = true;
  }
  // Function to damage ship
  hit() {
    if (this.isLive) {
      this.hits++;
      this.#isSunk();
    }
    return this.hits;
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
    this.xAxy = false;
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
  // Places ship in given coordinates on current axy
  placeShip(length, start) {
    if (length > 5 || length < 2) {
      throw new Error("Ship's size is out of bounds.");
    } else if ((start[0] > 8 || start[0] < 0) || (start[1] > 8 || start[1] < 0)) {
      throw new Error("Coordinate\s are out of bounds.");
    }

    let ship = new Ship(length);
    let [x, y] = start;

    if (this.xAxy) {
      for (let i = y; i < length + 1; i++) {
        this.board[x][i] = ship;
      }
    } else {
      for (let i = x; i < length + 1; i++) {
        this.board[i][y] = ship;
      }
    }
  }
}
