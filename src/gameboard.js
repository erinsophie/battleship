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
    // mark cell as attempted
    this.cells[index].markAsAttempted();

    // check if the cell that was hit is occupied
    if (this.cells[index].occupied) {
      // find which ship it belongs to
      let shipThatWasHit;

      this.ships.forEach((ship) => {
        if (ship.positions.includes(index)) shipThatWasHit = ship;
      });

      // call hit method on that cell to push that index into its hits array
      shipThatWasHit.hit(index);
    } else {
      // if the cell is not occupied, add it to the misses array
      this.misses.push(index);
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

export default Gameboard;
