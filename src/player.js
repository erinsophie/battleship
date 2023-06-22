// represents the player's board and their functionality
class Player {
  constructor(name, gameboard, opponentBoard) {
    this.name = name;
    this.gameboard = gameboard;
    this.opponentBoard = opponentBoard;
  }

  // let player place 5 ships
  placePlayerShip(start, length, axis) {
    if (this.gameboard.ships.length < 5) {
      this.gameboard.placeShip(start, length, axis);
    }
  }

  // player takes their shot at opponent's board
  playerTurn(index) {
    const notAttemptedBefore = !this.opponentBoard.cells[index].attempted;

    // if player has not attempted this cell on opponent's board
    if (notAttemptedBefore) {
      const hit = this.opponentBoard.attack(index);

      // if attack did not hit a ship, add this to player's misses
      if (!hit) {
        this.gameboard.addToMisses(index);
      }
    }
  }
}

export default Player;
