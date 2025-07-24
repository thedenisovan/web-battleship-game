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
  #FIELD_LENGTH = 9;
  constructor() {
    this.board = this.#generateBoard();
  }
  // Creates 2d game board
  #generateBoard() {
    let board = [];
    for (let i = 0; i <= this.#FIELD_LENGTH; i++) {
      board[i] = [];
      for (let j = 0; j <= this.#FIELD_LENGTH; j++) {
        board[i][j] = null;
      }
    }
    return board;
  }
  // Places ship in given coordinates on horizontal or vertical
  placeShip(length, start, horizontal = true) {
    let [row, col] = start;

    this.#errorHandling(length, start, horizontal);

    let ship = new Ship(length);

    if (horizontal) {
      for (let i = row; i < length + row; i++) {
        this.board[i][col] = ship;
      }
    } else {
      for (let i = col; i < length + col; i++) {
        this.board[row][i] = ship;
      }
    }
  }
  // Helper function to test ship size and ship's coordinates
  #errorHandling(length, start, horizontal) {
    let [row, col] = start;
    let direction = horizontal ? row : col;

    if (length > 5 || length < 2) {
      throw new Error("Ship's size is out of bounds.");
    } else if (
      (horizontal && row + length > this.#FIELD_LENGTH)  ||
      (!horizontal && col + length > this.#FIELD_LENGTH) ||
      row < 0 ||
      col < 0
    ) {
      throw new Error('Coordinate\s are out of boundaries.');
    }
    // Check if fields are available - both horizontal and vertical
    for (let i = direction; i < direction + length; i++) {
      if (this.board[horizontal ? i : row][!horizontal ? i : col] !== null) {
        throw new Error('Field not available.');
      } 
    }
  }
}
