// represents the player's board and their functionality
class Opponent {
  constructor(name, gameboard) {
    this.name = name;
    this.gameboard = gameboard;
    this.shipSizes = [2, 3, 3, 4, 5];
    this.initBoard();
  }

  // opponent's board is set up with 5 ships placed in random legal cells
  initBoard() {
    while (this.gameboard.ships.length < 5) {
      const startIndex = this.generateRandomIndex();
      const length = this.shipSizes[this.gameboard.ships.length];
      const axis = Math.random() < 0.5 ? "x" : "y";
      this.gameboard.placeShip(startIndex, length, axis);
    }
  }

  generateRandomIndex() {
    return Math.floor(Math.random() * this.gameboard.cells.length);
  }

  //recieve attack from player
  receiveAttack(index) {
    this.gameboard.receiveAttack(index);
  }

  // ai attacks players board
  attack(index, playerBoard) {
    playerBoard.receiveAttack(index);
  }
}

export default Opponent;
