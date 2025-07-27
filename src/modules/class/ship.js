export class Ship {
  #hits = 0;
  #isLive = true;
  constructor(length) {
    this.length = length;
  }
  // Function to damage ship
  hit() {
    if (this.#isLive) {
      this.#hits++;
      this.#isSunk();
    }
    return this.#hits;
  }
  // Helper function which sets ship to sunken
  #isSunk() {
    if (this.#hits >= this.length) {
      this.#isLive = false;
    }
  }

  get isLive() {
    return this.#isLive;
  }
}
