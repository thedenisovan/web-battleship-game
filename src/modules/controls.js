import { Player, AiPlayer } from './gamePlay.js';

export let player1 = new Player();
export let computer = new AiPlayer();

player1.gameBoard.placeShip(4, [0, 0], false);
player1.gameBoard.placeShip(3, [2, 6], true);
player1.gameBoard.placeShip(3, [8, 6], false);
player1.gameBoard.placeShip(2, [7, 1], false);
player1.gameBoard.placeShip(5, [4, 4], true);

computer.randomPlacement();
