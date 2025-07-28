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

// Toggles game from disabled to running
// Sets computes ships at random placement
// Attaches event delegation to enemy field;
function toggleGameStatus() {
  if (flags.hasPlayerPlacedShips) {
    flags.isGameOn = true;
    ui.changeDisplayText();
    computer.randomPlacement();
    ui.toggleEnemyBoard(flags.isGameOn);
    attachEventDelegation();
    playBtn.classList.toggle('hidden');
    shuffleBtn.classList.toggle('hidden');
  }
}

// Removes event listener from enemy field after move
// Makes computer attack at random pos after 1s and returns event listener
function makeComputerMove() {
  detachEventDelegation();
  setTimeout(() => {
    computer.computerAttack(player1);
    ui.renderFieldAfterAttack('[data-battlefield-left]', player1);
    attachEventDelegation();
    ui.changeDisplayText();
  }, 1000);
}

function randomizeShipsOnBoard(player) {
  if (!flags.isGameOn) {
    flags.hasPlayerPlacedShips = true;
    player.gameBoard.resetBoard();
    player.randomPlacement();
    ui.renderShipsOnBoard();
  }
}

function handleBattlefieldClick(event) {
  const target = event.target;

  if (target.classList.contains('cell')) {
    computer.gameBoard.receiveAttack(target.id[0], target.id[1]);
    ui.renderFieldAfterAttack('[data-battlefield-right]', computer);
    flags.isPlayerMove = false;
  }
  ui.changeDisplayText();
  makeComputerMove();
  flags.isPlayerMove = true;
}

function attachEventDelegation() {
  document.querySelector('[data-battlefield-right]')
    .addEventListener('click', handleBattlefieldClick);
}

function detachEventDelegation() {
  document.querySelector('[data-battlefield-right]')
    .removeEventListener('click', handleBattlefieldClick);
}


shuffleBtn.addEventListener('click', () => {
  randomizeShipsOnBoard(player1)
});

playBtn.addEventListener('click', () => {
  toggleGameStatus();
});
