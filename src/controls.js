import {Ship, GameBoard, Player} from './gamePlay.js'

export let player1 = new Player();
export let computer = new Player();

player1.gameBoard.placeShip(4, [0, 0], false);
player1.gameBoard.placeShip(3, [2, 6], true);
player1.gameBoard.placeShip(3, [8, 6], false);
player1.gameBoard.placeShip(2, [7, 1], false);
player1.gameBoard.placeShip(5, [4, 4], true);

computer.gameBoard.placeShip(4, [1, 8], true);
computer.gameBoard.placeShip(3, [6, 1], false);
computer.gameBoard.placeShip(2, [3, 3], true);
computer.gameBoard.placeShip(5, [0, 2], false);
computer.gameBoard.placeShip(3, [6, 6], false);


