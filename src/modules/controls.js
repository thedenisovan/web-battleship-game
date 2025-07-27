import { Player, AiPlayer } from './gamePlay.js';

export let player1 = new Player();
export let computer = new AiPlayer();

// Render moves after each attack
export function renderMoves(field, player) {
  const [red, green] = ['rgba(250, 4, 5, 0.7)', 'rgba(5, 250, 5, 0.7)'];

  document.querySelectorAll(`${[field]} .cell`).forEach((cell) => {
    if (player.gameBoard.board[cell.id[0]][cell.id[1]] === 'x') {
        cell.style.background = red;
      } else if (player.gameBoard.board[cell.id[0]][cell.id[1]] === 'o') {
        cell.style.background = green;
      }
  });
}
