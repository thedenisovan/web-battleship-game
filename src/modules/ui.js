import { player1, computer, renderMoves } from './controls.js';
import { Ship } from './gamePlay.js';
generatePlayerShips();

// For each battlefield create a grid of 10x10 cells
document.querySelectorAll('.field').forEach((field) => {
  createGrid(10, field);
});
document.querySelectorAll('[data-battlefield-right] .cell').forEach((cell) => {
  cell.addEventListener('click', () => {
    computer.gameBoard.receiveAttack(cell.id[0], cell.id[1]);
    renderMoves('[data-battlefield-right]', computer);
  });
});
document.querySelectorAll('[data-battlefield-left] .cell').forEach((cell) => {
    renderMoves('[data-battlefield-left]', player1);
    if (player1.gameBoard.board[cell.id[0]][cell.id[1]] instanceof Ship) {
      cell.style.background = 'rgba(4, 4, 250, 0.7)';
    }
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