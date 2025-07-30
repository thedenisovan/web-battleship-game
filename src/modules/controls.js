import { Player, AiPlayer, delay } from './classes.js';
import * as ui from './ui.js';

export let player1 = new Player();
export let computer = new AiPlayer();
export let result;

export const flags = {
  isGameOn: false,
  isPlayerMove: true,
  hasPlayerPlacedShips: false,
}

const playBtn = document.querySelector('[data-play]');
const shuffleBtn = document.querySelector('[data-random]');
const resetBtn = document.querySelector('[data-reset]');

// Toggles game from disabled to running
// Sets computes ships at random placement
// Attaches event delegation to enemy field;
function enableGame() {
  if (flags.hasPlayerPlacedShips) {
    flags.isGameOn = true;
    ui.changeDisplayText();
    computer.randomPlacement();
    ui.toggleEnemyBoard(flags.isGameOn);
    attachEventDelegation();
    playBtn.classList.add('hidden');
    shuffleBtn.classList.add('hidden');
  }
}

// Removes event listener from enemy field after move
// Makes computer attack at random pos after 1s and returns resolved promise
async function makeComputerMove() {
  detachEventDelegation();
  let returnValue;

  if (flags.isGameOn && !flags.isPlayerMove) {
    returnValue = await computer.computerAttack(player1);
    
    attachEventDelegation();
    ui.changeDisplayText();
  }
  return returnValue;
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
  result = null;
  flags.isPlayerMove = true;

  if (target.classList.contains('cell') && !target.classList.contains('disabled') && flags.isPlayerMove) {

    target.classList.add('disabled');
    result = computer.gameBoard.receiveAttack(target.id[0], target.id[1]);
    ui.changeDisplayText();
    ui.renderFieldAfterAttack('[data-battlefield-right]', computer);
    checkGameOver();
    // If you hit a cell containing a ship you can repeat your move
    if (result === 'Hit' || result === 'You sunk a ship.') return;
    
    flags.isPlayerMove = false;
    ui.changeDisplayText();
    setTimeout(() => {
      makeComputerMove();
    }, 400);
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

export function checkGameOver() {
  if (player1.gameBoard.lives < 1|| computer.gameBoard.lives < 1) {
    disableGame();
  }
}

function disableGame() {
  flags.isGameOn = false;
  flags.isPlayerMove = false;
  detachEventDelegation();
  ui.changeDisplayText();
  ui.toggleEnemyBoard(flags.isGameOn);
  resetBtn.classList.remove('hidden');
}

function restartGame() {
  player1.gameBoard.resetBoard();
  player1.gameBoard.lives = 17;
  computer.gameBoard.resetBoard();
  computer.gameBoard.lives = 17;

  ui.resetBoardCells('[data-battlefield-right]');
  ui.resetBoardCells('[data-battlefield-left]');

  playBtn.classList.remove('hidden');
  shuffleBtn.classList.remove('hidden');
  resetBtn.classList.add('hidden');

  flags.isPlayerMove = true;
}

shuffleBtn.addEventListener('click', () => {
  randomizeShipsOnBoard(player1);
});

playBtn.addEventListener('click', () => {
  enableGame();
});

resetBtn.addEventListener('click', () => {
  restartGame();
})