import { Ship, GameBoard } from '../gamePlay.js';

describe('Testing ship hit behavior', () => {
  let destroyer;

  beforeEach(() => {
    destroyer = new Ship(2);
  });

  test('Ship has been hit', () => {
    expect(destroyer.hit()).toEqual(1);
  });
  test('Ship has been sunken', () => {
    destroyer.hit();
    expect(destroyer.hit()).toEqual(2);
  });
});

describe('Testing game board behavior', () => {
  let gameBoard;

  beforeAll(() => {
    gameBoard = new GameBoard();
  });

  test('places a ship at the given coordinates when empty', () => {
    gameBoard.placeShip(3, [1, 7]);
    expect(gameBoard.board[2][7]).not.toBeNull();
  });
  test('Look for ship at given coordinates', () => {
    expect(gameBoard.board[3][7]).not.toBeNull();
  });
  test('Return null when ship is wrong size', () => {
    expect(gameBoard.placeShip(6, [2, 2])).toBeNull();
  });
  test('Return null when ship goes out of game board', () => {
    expect(gameBoard.placeShip(6, [8, 8])).toBeNull();
  });
  test('Places a ship at the given coordinates when not empty', () => {
    expect(gameBoard.placeShip(3, [1, 7])).toBeNull();
  });

  test('Missed attack on ship', () => {
    expect(gameBoard.receiveAttack(5, 5)).toBe('Missed.');
  });
  test('Ship has been hit', () => {
    expect(gameBoard.receiveAttack(2, 7)).toBe('Hit.');
  });
  test('Ship has been hit', () => {
    expect(gameBoard.receiveAttack(1, 7)).toBe('Hit.');
  });
  test('Ship has sunk', () => {
    expect(gameBoard.receiveAttack(3, 7)).toBe('You sunk a ship.');
  });
  test('Ship removed from board', () => {
    expect(gameBoard.board[2][7]).toBe('x');
  });
});
