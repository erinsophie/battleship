class Ship {
  constructor(positions) {
    this.positions = positions;
    this.length = positions.length;
    this.hits = [];
  }

  hit(position) {
    if (this.hits.includes(position)) return;
    this.hits.push(position);
  }

  isSunk() {
    return this.hits.length === this.length;
  }
}

export default Ship;
