import { Ship, GameBoard } from "../gameLogic.js";

describe("Testing ship hit behavior", () => {
  let destroyer;

  beforeAll(() => {
    destroyer = new Ship(2);
  });

  test("Ship has been hit.", () => {
    expect(destroyer.hit()).toEqual(1);
  });
  test("Ship has been sunken.", () => {
    expect(destroyer.hit()).toEqual(2);
  });
});

describe("Testing game board behavior", () => {
  let gameBoard;

  beforeAll(() => {
    gameBoard = new GameBoard();
  });

  test("Place ship at given coordinates", () => {
    gameBoard.placeShip(2, [[1], [1]]);
    expect(gameBoard.board[1][1]).not.toBeNull();
  });
  test("Place ship at given coordinates", () => {
    gameBoard.placeShip(5, [[1], [1]]);
    expect(gameBoard.board[2][1]).not.toBeNull();
  });
});
