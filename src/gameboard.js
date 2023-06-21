//Gameboards should be able to place ships at specific coordinates by calling the ship factory function.
//Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
//Gameboards should keep track of missed attacks so they can display them properly.
//Gameboards should be able to report whether or not all of their ships have been sunk.

import Ship from "./ship";

class Gameboard {
  constructor() {
    this.cells = [];
    this.init();
  }

  // initialise board with 100 cells
  init() {
    for (let i = 0; i < 100; i++) {
      this.cells.push({
        occupied: false,
        attempted: false,
        markOccupied() {
          this.occupied = true;
        },
        markAttempted() {
          this.attempted = true;
        },
      });
    }
  }

  isValidPlacement(start, length, axis) {
    // e.g 27 would be row 2, col 7
    const startRow = Math.floor(start / 10);
    const startCol = start % 10;
  
    if (axis === 'x') {
      const end = start + (length - 1);
      // if move does not go off the board 
      if (startCol + length - 1 <= 9) {
        // check if any of the cells the ship would occupy are already occupied 
        for (let i = start; i <= end; i++) {
          if (this.cells[i].occupied) return false;
        }
        return true;
      }
    }
    else if (axis === 'y') {
      const end = start + (length - 1) * 10;
      if (startRow + length - 1 <= 9) {
        for (let i = start; i <= end; i += 10) {
          if (this.cells[i].occupied) return false;
        }
        return true;
      }
    }
  
    return false;
  }
}

export default Gameboard;
