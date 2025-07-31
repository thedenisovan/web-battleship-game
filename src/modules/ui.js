import * as control from './controls.js';
import { Ship } from './classes.js';

const RED_HIT_COLOR = 'rgba(250, 4, 5, 0.7)';
const GREEN_MISS_COLOR = 'rgba(5, 250, 5, 0.7)';
const BLUE_SHIP_COLOR = 'rgba(4, 4, 250, 0.7)';
const MAX_BOARD_SIZE = 10;

(function createGrid(size) {
  document.querySelectorAll('.field').forEach((field) => {
    for (let i = 0; i < size * size; i++) {
      const cell = document.createElement('div');

      cell.style.height = `${100 / size}%`;
      cell.style.width = `${100 / size}%`;
      cell.classList.add('cell');

      cell.id = i < 10 ? '0' + i : i;
      field.appendChild(cell);
    }
  });
  changeDisplayText();
})(MAX_BOARD_SIZE);

export const PLAYER_BOARD_SELECTOR = document.querySelectorAll('[data-battlefield-left] .cell');
export const ENEMY_BOARD_SELECTOR = document.querySelectorAll('[data-battlefield-right] .cell');

// Render display after each attack
export function renderFieldAfterAttack(field, player) {
  document.querySelectorAll(`${[field]} .cell`).forEach((cell) => {
    const currentCell = player.gameBoard.board[cell.id[0]][cell.id[1]];

    if (currentCell === 'x') {
      cell.style.background = RED_HIT_COLOR;
    } else if (currentCell === 'o') {
      cell.style.background = GREEN_MISS_COLOR;
    }
  });
}

// Renders player ships placement on game board
export function renderShipsOnBoard() {
  resetBoardCells('[data-battlefield-left]');
  renderFieldAfterAttack('[data-battlefield-left]', control.player1);

  PLAYER_BOARD_SELECTOR.forEach((cell) => {
    if (
      control.player1.gameBoard.board[cell.id[0]][cell.id[1]] instanceof Ship
    ) {
      cell.style.background = BLUE_SHIP_COLOR;
    }
  });
}

// Toggles between disabled and enabled board style
export function toggleEnemyBoard(flag) {
  if (flag) {
    ENEMY_BOARD_SELECTOR.forEach((cell) => cell.classList.remove('disabled'));
  } else {
    ENEMY_BOARD_SELECTOR.forEach((cell) => cell.classList.add('disabled'));
  }
  toggleFocusState();
}

// Resets looks of board
export function resetBoardCells(field) {
  document.querySelectorAll(`${field} .cell`).forEach((cell) => {
    cell.style.background = 'none';
  });
}

export function changeDisplayText() {
  const playerMove = control.flags.isPlayerMove;
  const isGameOn = control.flags.isGameOn;
  const result = control.result;
  
  switch(true) {
    case playerMove && isGameOn && result !== 'You sunk a ship.':
      display.textContent = `Your move skipper!`
      break;
    case result === 'You sunk a ship.' && isGameOn:
      display.textContent = result;
      break;
    case !playerMove && isGameOn:
      display.textContent = `Hold your horses Captain, Its computers move!`
      break;
    case control.flags.hasPlayerPlacedShips && !isGameOn:
      display.textContent = control.player1.gameBoard.lives > control.computer.gameBoard.lives ? 'Game over! You won!' : 'Game over! You lost!';
      break;
    default:
      display.textContent = 'Place ships and you will be ready to begin sea battle.';
  }
}

// Creates squared blocks representing a player ships on side of the field
function renderPlayerShips() {
  document.querySelectorAll('[data-ship]').forEach((ship) => {
    for (let i = 0; i < ship.id; i++) {
      const square = document.createElement('div');
      square.classList.add('square');
      ship.appendChild(square);
    }
  });
}

// If game is on on on hover enemy board cell must be color red
export function toggleFocusState() {
  if (!control.flags.isGameOn) {
    document.querySelectorAll('.disabled')
  .forEach((cell) => {
    cell.addEventListener('mouseover', () => {
      cell.classList.add('focused');
    });
    cell.addEventListener('mouseout', () => {
      cell.classList.remove('focused');
    });
  });
  }
}

export function hideSideBar() {
  if (control.flags.hasPlayerPlacedShips) {
    document.querySelector('.left-bar').style.display = 'none';
  }
}

PLAYER_BOARD_SELECTOR.forEach((cell) => {
  cell.addEventListener('mouseover', () => {
    cell.classList.add('selected');
  });
});
PLAYER_BOARD_SELECTOR.forEach((cell) => {
  cell.addEventListener('mouseleave', () => {
    cell.classList.remove('selected');
  });
});

toggleEnemyBoard(control.flags.isGameOn);
renderPlayerShips();