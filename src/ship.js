function Ship(positions) {
  return {
    positions,
    length: positions.length,
    hits: [],
    hit(position) {
      if (!this.hits.includes(position)) this.hits.push(position);
    },
    isSunk() {
      return this.hits.length === this.length;
    },
  };
}

export default Ship;
