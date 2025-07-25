import { player1, computer } from './controls.js';
import { Ship } from './gamePlay.js'

const backgroundImg = require('./assets/background.jpg');

// For each battlefield create a grid of 10x10 cells
document.querySelectorAll('[data-battlefield]').forEach((field) => {
    createGrid(10, field);
    field.style.background = backgroundImg;
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

document.querySelectorAll('.battlefield-right .cell').forEach((cell) => {
  if (computer.gameBoard.board[cell.id[0]][cell.id[1]] instanceof Ship) {
      cell.style.background = 'rgba(250, 4, 28, 0.49)';
    }
});
document.querySelectorAll('.battlefield-left .cell').forEach((cell) => {
  if (player1.gameBoard.board[cell.id[0]][cell.id[1]] instanceof Ship) {
      cell.style.background = 'rgba(250, 4, 28, 0.49)';
    }
});
// Creates squared blocks representing a ship
document.querySelectorAll('[data-ship]').forEach((ship) => {
  for (let i = 0; i < ship.id; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    ship.appendChild(square);
  }
});