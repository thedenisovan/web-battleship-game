export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.isLive = true;
  }
  hit() {
    this.hits++;
    this.#isSunk();
    if (!this.isLive) {
      return 'You did sunk the ship.';
    } else {
      return 'You did hit the ship.'
    }
  }
  #isSunk() {
    if (this.hits >= this.length) {
      this.isLive = false;
    }
  }
}