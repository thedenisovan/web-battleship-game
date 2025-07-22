import { Ship } from '../gameLogic.js'

describe('Testing ship hit behavior', () => {
  let destroyer;

  beforeAll(() => {
    destroyer = new Ship(2);
  });

  test('Ship has been hit.', () => {
    expect(destroyer.hit()).toBe('You did hit the ship.');
  });
  test('Ship has been sunken.', () => {
    expect(destroyer.hit()).toBe('You did sunk the ship.');
  })
});