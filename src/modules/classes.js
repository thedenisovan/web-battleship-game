// ===SHIP CLASS===
export class Ship {
  #hits = 0;
  #isLive = true;
  constructor(length) {
    this.length = length;
  }
  // Function to damage ship
  hit() {
    if (this.#isLive) {
      this.#hits++;
      this.#isSunk();
    }
    return this.#hits;
  }
  // Helper function which sets ship to sunken
  #isSunk() {
    if (this.#hits >= this.length) {
      this.#isLive = false;
    }
  }

  get isLive() {
    return this.#isLive;
  }
}

// ===GAME-BOARD CLASS===
export class GameBoard {
  #MAX_INDEX = 9;
  #ships = [];
  constructor() {
    this.board = this.#generateBoard();
    this.lives = 17;
  }
  // Creates 2d game board, each empty position is set to null
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
  resetBoard() {
    this.board = null;
    this.board = this.#generateBoard();
  }
  // Places ship in given Coordinate's on vertical or horizontal axis
  placeShip(length, start, vertical = true) {
    let [row, col] = start;
    let direction = vertical ? row : col;

    if (this.#errorHandling(length, start, vertical)) return null;

    let ship = new Ship(length);
    this.#ships.push(ship);

    // If direction is vertical add ship in vertical line, else horizontal
    for (let i = direction; i < direction + length; i++) {
      this.board[vertical ? i : row][!vertical ? i : col] = ship;
    }
    return true;
  }
  // Helper function to check if ship has been placed correctly
  #errorHandling(length, start, vertical) {
    let [row, col] = start;
    let direction = vertical ? row : col;

    if (length > 5 || length < 2) return true;
    else if (
      (vertical && row + length > this.#MAX_INDEX) ||
      (!vertical && col + length > this.#MAX_INDEX) ||
      row < 0 ||
      col < 0
    ) {
      return true;
    }
    // If direction is vertical check if fields are available vertical dir, else horizontal
    for (let i = direction; i < direction + length; i++) {
      if (this.board[vertical ? i : row][!vertical ? i : col] !== null)
        return true;
    }
    return false;
  }
  receiveAttack(row, col) {
    if (row > this.#MAX_INDEX || row < 0 || col > this.#MAX_INDEX || col < 0)
      throw new Error('Wrong coordinate input.');

    // If cell have been attacked before
    if (this.board[row][col] === 'o' || this.board[row][col] === 'x') {
      return null;
    } else if (this.board[row][col] === null) {
      // If cell attack has been missed
      this.board[row][col] = 'o';
      return 'Missed.';
    } else {
      // If attack has been successful
      this.lives--;
      this.board[row][col].hit();
      this.board[row][col] = 'x';
      if (this.#checkForSunkShip()) return 'You sunk a ship.';
      else {
        return 'Hit';
      }
    }
  }
  #checkForSunkShip() {
    const originalLength = this.#ships.length;
    this.#ships = this.#ships.filter((ship) => ship.isLive);

    if (originalLength !== this.#ships.length) return true;
    else return false;
  }
}

// ===PLAYER CLASS===
export class Player {
  constructor() {
    this.gameBoard = new GameBoard();
  }
  randomIdx() {
    return Math.floor(Math.random() * 10);
  }
  direction() {
    return this.randomIdx() > 5;
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
  computerAttack(player) {
    let x = this.randomIdx();
    let y = this.randomIdx();
    let board = player.gameBoard.board;

    while (board[x][y] === 'o' || board[x][y] === 'x') {
      x = this.randomIdx();
      y = this.randomIdx();
    }
    return player.gameBoard.receiveAttack(x, y);
  }
}

