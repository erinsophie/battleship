class Ship {
  constructor(positions) {
    this.positions = positions;
    this.length = positions.length;
    this.hits = [];
  }

  hit(position) {
    this.hits.push(position);
  }

  isSunk() {
    return this.hits.length === this.length;
  }
}

export default Ship;
