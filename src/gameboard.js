import Ship from "./ship.js";

class Gameboard {
  constructor() {
    this.cells = [];
    this.ships = [];
    this.misses = [];
    this.init();
  }

  // initialise board with 100 cells
  init() {
    for (let i = 0; i < 100; i++) {
      this.cells.push({
        occupied: false,
        attempted: false,
        markAsOccupied() {
          this.occupied = true;
        },
        markAsAttempted() {
          this.attempted = true;
        },
      });
    }
  }

  // checks whether the position player wants to place ship fits in those cells and is not already occupied
  isValidPlacement(start, length, axis) {
    return (
      this.fitsInCells(start, length, axis) &&
      this.isUnoccupied(start, length, axis)
    );
  }

  fitsInCells(start, length, axis) {
    // e.g 27 would be row 2, col 7 in (0-indexed)
    const startRow = Math.floor(start / 10);
    const startCol = start % 10;

    // check if move does not go off the board
    if (axis === "x") {
      if (startCol + length - 1 <= 9) return true;
    }

    if (axis === "y") {
      if (startRow + length - 1 <= 9) return true;
    }

    return false;
  }

  isUnoccupied(start, length, axis) {
    const end = axis === "x" ? start + (length - 1) : start + (length - 1) * 10;

    if (axis === "x") {
      for (let i = start; i <= end; i++) {
        if (this.cells[i].occupied) return false;
      }
    }

    if (axis === "y") {
      for (let i = start; i <= end; i += 10) {
        if (this.cells[i].occupied) return false;
      }
    }

    return true;
  }

  placeShip(start, length, axis) {
    if (this.isValidPlacement(start, length, axis)) {
      const positions = [];
      const end =
        axis === "x" ? start + (length - 1) : start + (length - 1) * 10;

      // mark those cells as occupied
      // push each position into positions array
      for (let i = start; i <= end; i += axis === "x" ? 1 : 10) {
        this.cells[i].markAsOccupied();
        positions.push(i);
      }

      // create a new ship with those positions
      const newShip = new Ship(positions);
      // push new ship object into ships array
      this.ships.push(newShip);
    }
  }

  attack(index) {
    this.cells[index].markAsAttempted();
    // if cell contains a ship, send hit to that ship
    if (this.cells[index].occupied) {
      const hitShip = this.ships.find((ship) => ship.positions.includes(index));

      if (hitShip && !hitShip.hits.includes(index)) {
        hitShip.hit(index);
        this.cells[index].markAsAttempted();
        return true; // successful attack
      }
    }
    return false; // unsuccessful attack
  }

  addToMisses(index) {
    if (!this.misses.includes(index)) this.misses.push(index);
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

export default Gameboard;
