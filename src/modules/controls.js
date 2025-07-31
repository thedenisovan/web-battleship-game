import { Player, AiPlayer, delay } from './classes.js';
import * as ui from './ui.js';

export let player1 = new Player();
export let computer = new AiPlayer();

export let result = null;
let currentSelectedShipLength = null;
const enemyBoard = '[data-battlefield-right]';
const playerBoard = '[data-battlefield-left]';

export const flags = {
  isGameOn: false,
  isPlayerMove: true,
  hasPlayerPlacedShips: false,
  isPlayerSelectingField: false
}

const playBtn = document.querySelector('[data-play]');
const shuffleBtn = document.querySelector('[data-random]');
const resetBtn = document.querySelector('[data-reset]');
const ship = document.querySelectorAll('[data-ship]');

// Toggles game from disabled to running
// Sets computes ships at random placement
// Attaches event delegation to enemy field;
function enableGame() {
  if (flags.hasPlayerPlacedShips) {
    flags.isGameOn = true;
    ui.changeDisplayText();
    computer.randomPlacement();
    ui.toggleEnemyBoard(flags.isGameOn);
    attachEventDelegation(enemyBoard, handleBattlefieldClick);
    playBtn.classList.add('hidden');
    shuffleBtn.classList.add('hidden');
  }
}

// Removes event listener from enemy field after move
// Makes computer attack at random pos after 1s and returns resolved promise
async function makeComputerMove() {
  detachEventDelegation(enemyBoard, handleBattlefieldClick);
  let returnValue;

  if (flags.isGameOn && !flags.isPlayerMove) {
    returnValue = await computer.computerAttack(player1);
    
    ui.changeDisplayText();
    attachEventDelegation(enemyBoard, handleBattlefieldClick);
    flags.isPlayerMove = true;
  }
  return returnValue;
}

function randomizeShipsOnBoard(player) {
  if (!flags.isGameOn) {
    flags.hasPlayerPlacedShips = true;
    player.gameBoard.resetBoard();
    player.randomPlacement();
    ui.renderShipsOnBoard();
    ui.hideSideBar();
  }
}

async function handleBattlefieldClick(event) {
  const target = event.target;

  if (target.classList.contains('cell') && !target.classList.contains('disabled') && flags.isPlayerMove) {

    target.classList.add('disabled');
    result = computer.gameBoard.receiveAttack(target.id[0], target.id[1]);
    ui.changeDisplayText();
    ui.renderFieldAfterAttack(enemyBoard, computer);
    checkGameOver();
    // If you hit a cell containing a ship you can repeat your move
    if (result === 'Hit' || result === 'You sunk a ship.') return;
    
    flags.isPlayerMove = false;
    ui.changeDisplayText();
    await delay(500);
    await makeComputerMove();
  }
}

// Attach event listener to enemy battle field
function attachEventDelegation(board, fn) {
  document.querySelector(board)
    .addEventListener('click', fn);
}

function detachEventDelegation(board, fn) {
  document.querySelector(board)
    .removeEventListener('click', fn);
}

export function checkGameOver() {
  if (player1.gameBoard.lives < 1|| computer.gameBoard.lives < 1) {
    disableGame();
  }
}

function disableGame() {
  flags.isGameOn = false;
  flags.isPlayerMove = false;
  detachEventDelegation(enemyBoard, handleBattlefieldClick);
  ui.changeDisplayText();
  ui.toggleEnemyBoard(flags.isGameOn);
  resetBtn.classList.remove('hidden');
}

function restartGame() {
  player1.gameBoard.resetBoard();
  player1.gameBoard.lives = 15;
  computer.gameBoard.resetBoard();
  computer.gameBoard.lives = 15;

  ui.resetBoardCells(enemyBoard);
  ui.resetBoardCells(playerBoard);

  playBtn.classList.remove('hidden');
  shuffleBtn.classList.remove('hidden');
  resetBtn.classList.add('hidden');

  flags.isPlayerMove = true;
}


function shipEventDelegation() {
  document.querySelector('.port')
    .addEventListener('click', (event) => {
      const target = event.target.parentElement;

      if (target) {
        flags.isPlayerSelectingField = true;
        currentSelectedShipLength = Number(target.id);
      }
    })
}

// If ship has been selected and click happens outside ships or battlefield deselect ship
document.addEventListener('click', (event) => {
  const playerBoardSelected = document.querySelector('[data-battlefield-left]');
  const port = document.querySelector('.port');

  if (!port.contains(event.target) && !playerBoardSelected.contains(event.target)) {
    flags.isPlayerSelectingField = false;
    currentSelectedShipLength = null;

    ship.forEach((s) => s.classList.remove('selected'))
  }
});

// Places selected ship on player board
attachEventDelegation(playerBoard, (event) => {
  if (flags.isPlayerSelectingField) {
    player1.gameBoard.placeShip(currentSelectedShipLength, [+event.target.id[0], +event.target.id[1]], false);
    ui.renderShipsOnBoard();
    document.getElementById(`${currentSelectedShipLength}`).style.display = 'none';

    currentSelectedShipLength = null;
    flags.isPlayerSelectingField = false;
    ship.forEach((s) => s.classList.remove('selected'));
  }
});

// Adds style to focused or clicked ship
ship.forEach((one) => {
  const length = Number(one.id);
  one.style.width = `${2.5 * length}vw`;

  one.addEventListener('click', () => {
    ship.forEach(s => s.classList.remove('selected'));
    one.classList.add('selected');
  });
});

shuffleBtn.addEventListener('click', () => {
  randomizeShipsOnBoard(player1);
});

playBtn.addEventListener('click', () => {
  enableGame();
});

resetBtn.addEventListener('click', () => {
  restartGame();
});

shipEventDelegation();
