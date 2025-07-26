import { player1, computer } from './controls.js';
import { Ship } from './gamePlay.js';

const [red, green, blue] = ['rgba(250, 4, 5, 0.7)', 'rgba(5, 250, 5, 0.7)', 'rgba(4, 4, 250, 0.7)'];

// For each battlefield create a grid of 10x10 cells
document.querySelectorAll('[data-battlefield]').forEach((field) => {
  createGrid(10, field);
  field.style.background = './assets/background.jpg';
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
document.querySelectorAll('[data-ship]').forEach((ship) => {
  for (let i = 0; i < ship.id; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    ship.appendChild(square);
  }
});

document.querySelectorAll('.battlefield-right .cell').forEach((cell) => {
  if (computer.gameBoard.board[cell.id[0]][cell.id[1]] instanceof Ship) {
    cell.style.background = blue;
  }
  cell.addEventListener('click', () => {
    computer.gameBoard.receiveAttack(cell.id[0], cell.id[1]);
    if (computer.gameBoard.board[cell.id[0]][cell.id[1]] === 'x') {
      cell.style.background = red;
    } else if (computer.gameBoard.board[cell.id[0]][cell.id[1]] === 'o') {
      cell.style.background = green;
    }
  });
});
document.querySelectorAll('.battlefield-left .cell').forEach((cell) => {
   if (player1.gameBoard.board[cell.id[0]][cell.id[1]] === 'x') {
      cell.style.background = red;
    } else if (player1.gameBoard.board[cell.id[0]][cell.id[1]] === 'o') {
      cell.style.background = green;
    } else if (player1.gameBoard.board[cell.id[0]][cell.id[1]] instanceof Ship) {
    cell.style.background = blue;
  }
});
