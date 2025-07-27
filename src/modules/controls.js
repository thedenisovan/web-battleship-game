import { Player, AiPlayer } from './classes.js';
import * as ui from './ui.js';

export let player1 = new Player();
export let computer = new AiPlayer();

export const flags = {
  isGameOn: false,
  isPlayerMove: true,
  hasPlayerPlacedShips: false,
  isGameOver: false,
}

const playBtn = document.querySelector('[data-play]');
const shuffleBtn = document.querySelector('[data-random]');

// Toggles between different game states
function toggleGameStatus() {
  if (flags.hasPlayerPlacedShips) {
    flags.isGameOn = true;
    ui.toggleEnemyBoard(flags.isGameOn);
    playBtn.classList.toggle('hidden');
    shuffleBtn.classList.toggle('hidden');
  }
}

// Listens for user attack to take place, then calls render function
function renderAttack() {
  if (flags.isGameOn && flags.isPlayerMove) {
    flags.isPlayerMove = false;
    ui.ENEMY_BOARD_SELECTOR.forEach((cell) => {
      cell.addEventListener('click', () => {
        computer.gameBoard.receiveAttack(cell.id[0], cell.id[1]);
        ui.renderFieldAfterAttack('[data-battlefield-right]', computer);
        setTimeout(() => {
          computer.computerAttack(player1);
          ui.renderFieldAfterAttack('[data-battlefield-left]', player1);
        }, 1000);
        return 0;
      });
    });
  }
}

function randomizeShipsOnBoard(player) {
  if (!flags.isGameOn) {
    flags.hasPlayerPlacedShips = true;
    player.gameBoard.resetBoard();
    player.randomPlacement();
    ui.renderShipsOnBoard();
  }
}

shuffleBtn.addEventListener('click', () => {
  randomizeShipsOnBoard(player1)
});

playBtn.addEventListener('click', () => {
  toggleGameStatus();
  renderAttack();
  computer.randomPlacement();
});
