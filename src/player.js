class Player {
  constructor(name, playerBoard, opponentBoard) {
    this.name = name;
    this.playerBoard = playerBoard;
    this.opponentBoard = opponentBoard;
  }

  // let player place 5 ships
  placePlayerShip(start, length, axis) {
    if (this.playerBoard.ships.length < 5) {
      this.playerBoard.placeShip(start, length, axis);
    }
  }

  // player takes their shot at opponent's board
  playTurn(index) {
    // if the cell the player is attempting to attack has already been attacked
    // return false indicating that the player's turn did not execute
    if (this.opponentBoard.cells[index].attempted) {
      console.log(`Cell ${index} has already been attacked`);
      return false;
    }
    this.opponentBoard.attack(index);
    // return true to indicate that the player took their turn
    return true;
  }
}

export default Player;
