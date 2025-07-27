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
    attachEventDelegation();
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

function handleBattlefieldClick(event) {
  const target = event.target;

  if (target.classList.contains('cell')) {
    computer.gameBoard.receiveAttack(target.id[0], target.id[1]);
    ui.renderFieldAfterAttack('[data-battlefield-right]', computer);
    flags.isPlayerMove = false;
  }
}

function attachEventDelegation() {
  document.querySelector('[data-battlefield-right]')
    .addEventListener('click', handleBattlefieldClick);
}

function detachEventDelegation() {
  document.querySelector('[data-battlefield-right]')
    .removeEventListener('click', handleBattlefieldClick);
}


