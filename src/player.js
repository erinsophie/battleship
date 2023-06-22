// represents the player's board and their functionality
class Player {
  constructor(name, gameboard) {
    this.name = name;
    this.gameboard = gameboard;
  }

  // let player place 5 ships
  placePlayerShip(start, length, axis) {
    if (this.gameboard.ships.length < 5) {
      this.gameboard.placeShip(start, length, axis);
    }
  }

  //recieve attack from ai
  receiveAttack(index) {
    this.gameboard.receiveAttack(index);
  }

  // player attacks opponent's board
  attack(index, opponentBoard) {
    opponentBoard.receiveAttack(index);
  }
}

export default Player;
