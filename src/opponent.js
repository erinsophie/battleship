// represents the opponent's board
class Opponent {
  constructor(name, opponentBoard, playerBoard) {
    this.name = name;
    this.opponentBoard = opponentBoard;
    this.playerBoard = playerBoard;
    this.shipSizes = [2, 3, 3, 4, 5];
    this.initBoard();
  }

  // opponent's board is set up with 5 ships placed in random legal cells
  initBoard() {
    // safe gaurd in case computer keeps generating invalid indices to cap at 1000 attempts
    let attemptCounter = 0;

    while (this.opponentBoard.ships.length < 5 && attemptCounter < 1000) {
      const startIndex = this.generateRandomIndex();
      const length = this.shipSizes[this.opponentBoard.ships.length];
      const axis = Math.random() < 0.5 ? "x" : "y";

      this.opponentBoard.placeShip(startIndex, length, axis);
      attemptCounter++;
    }
    if (attemptCounter === 1000) {
      console.log("Could not find legal placement for all ships.");
    }
  }

  generateRandomIndex() {
    return Math.floor(Math.random() * this.opponentBoard.cells.length);
  }

  // computer takes random shot at player's board
  playTurn() {
    let index;
    do {
      // keep generating index if index generated was already attempted
      index = this.generateRandomIndex();
    } while (this.playerBoard.cells[index].attempted);

    this.playerBoard.attack(index);
    return index 
  }
}

export default Opponent;
