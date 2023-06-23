// represents the player's board and their functionality
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
    const notAttemptedBefore = !this.opponentBoard.cells[index].attempted;
    // if player has not attempted this cell on opponent's board
    // attack that opponent cell
    if (notAttemptedBefore) this.opponentBoard.attack(index);
  }
}

export default Player;
