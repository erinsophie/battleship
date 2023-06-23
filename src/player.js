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
    if (notAttemptedBefore) {
      this.opponentBoard.attack(index);
    } else {
      console.log("You have already taken a shot here!");
    }
  }
}

export default Player;
