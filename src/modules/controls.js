import { Player, AiPlayer } from './class/player.js';
import * as ui from './ui.js';

export let player1 = new Player();
export let computer = new AiPlayer();

// Listens for user attack to take place, then calls render function
export function renderAttack() {
  document
    .querySelectorAll('[data-battlefield-right] .cell')
    .forEach((cell) => {
      cell.addEventListener('click', () => {
        computer.gameBoard.receiveAttack(cell.id[0], cell.id[1]);
        ui.renderFieldAfterAttack('[data-battlefield-right]', computer);
      });
    });
}

document.querySelector('[data-random]').addEventListener('click', () => {
  player1.gameBoard.resetBoard();
  player1.randomPlacement();
  console.log(player1.gameBoard.board);
  ui.shipPlacement();
});
