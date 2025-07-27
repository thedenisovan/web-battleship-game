import * as control from './controls.js';
import { Ship } from './class/ship.js';
generatePlayerShips();

// For each battlefield create a grid of 10x10 cells
document.querySelectorAll('.field').forEach((field) => {
  createGrid(10, field);
});

function createGrid(size, element) {
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');

    cell.style.height = `${100 / size}%`;
    cell.style.width = `${100 / size}%`;
    cell.classList.add('cell');
    cell.id = i < 10 ? '0' + i : i; // Id to use as idx of battleships
    element.appendChild(cell);
  }
}

// Creates squared blocks representing a player ships
function generatePlayerShips() {
  document.querySelectorAll('[data-ship]').forEach((ship) => {
    for (let i = 0; i < ship.id; i++) {
      const square = document.createElement('div');
      square.classList.add('square');
      ship.appendChild(square);
    }
  });
}

// Render display after each attack
export function renderFieldAfterAttack(field, player) {
  const [red, green] = ['rgba(250, 4, 5, 0.7)', 'rgba(5, 250, 5, 0.7)'];

  document.querySelectorAll(`${[field]} .cell`).forEach((cell) => {
    const currentCell = player.gameBoard.board[cell.id[0]][cell.id[1]];

    if (currentCell === 'x') {
      cell.style.background = red;
    } else if (currentCell === 'o') {
      cell.style.background = green;
    }
  });
}

// Renders player ships placement on game board
export function shipPlacement() {
  resetBoardCells('[data-battlefield-left]');

  document.querySelectorAll('[data-battlefield-left] .cell').forEach((cell) => {
    renderFieldAfterAttack('[data-battlefield-left]', control.player1);
    if (
      control.player1.gameBoard.board[cell.id[0]][cell.id[1]] instanceof Ship
    ) {
      cell.style.background = 'rgba(4, 4, 250, 0.7)';
    }
  });
}

// Resets looks of board
function resetBoardCells(field) {
  document.querySelectorAll(`${field} .cell`).forEach((cell) => {
    cell.style.background = 'none';
  });
}

control.renderAttack();
