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
  #MAX_INDEX = 9;
  constructor() {
    this.board = this.#generateBoard();
    this.ships = [];
  }
  // Creates 2d game board
  #generateBoard() {
    let board = [];
    for (let i = 0; i < this.#MAX_INDEX + 1; i++) {
      board[i] = [];
      for (let j = 0; j < this.#MAX_INDEX + 1; j++) {
        board[i][j] = null;
      }
    }
    return board;
  }
  // Places ship in given Coordinate's on horizontal or vertical
  placeShip(length, start, horizontal = true) {
    let [row, col] = start;

    this.#errorHandling(length, start, horizontal);

    let ship = new Ship(length);
    this.ships.push(ship);

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
  // Helper function to test ship size and ship's Coordinate's
  #errorHandling(length, start, horizontal) {
    let [row, col] = start;
    let direction = horizontal ? row : col;

    if (length > 5 || length < 2) {
      throw new Error("Ship's size is out of bounds.");
    } else if (
      (horizontal && row + length > this.#MAX_INDEX) ||
      (!horizontal && col + length > this.#MAX_INDEX) ||
      row < 0 ||
      col < 0
    ) {
      throw new Error('Coordinates are out of boundaries.');
    }
    // Check if fields are available - both horizontal and vertical
    for (let i = direction; i < direction + length; i++) {
      if (this.board[horizontal ? i : row][!horizontal ? i : col] !== null) {
        throw new Error('Field not available.');
      }
    }
  }
  receiveAttack(row, col) {
    if (
      row > this.#MAX_INDEX ||
      row < 0 ||
      col > this.#MAX_INDEX ||
      col < 0
    )
      throw new Error('Wrong coordinate input.');

    if (this.board[row][col] === 'o' || this.board[row][col] === 'x') {
      return null;
    } else if (this.board[row][col] === null) {
      this.board[row][col] = 'o';
      return 'Missed.';
    } else {
      this.board[row][col].hit();
      this.board[row][col] = 'x';
      if (this.#checkForSunkSip()) return 'You sunk a ship.';
      else return 'Hit.';
    }
  }
  #checkForSunkSip() {
    const originalLength = this.ships.length;
    this.ships = this.ships.filter((ship) => ship.isLive)
    
    if (originalLength !== this.ships.length) return true;
    else return false;
  }
}
