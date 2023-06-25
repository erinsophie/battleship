class GameLoop {
  constructor(player, opponent) {
    // so we know the status of each game board
    this.player = player;
    this.opponent = opponent;
    this.isGameOver = false;
    this.turn = this.player;
  }

  // check if game is over
  checkGameOver() {
    if (
      this.player.playerBoard.allShipsSunk() ||
      this.opponent.opponentBoard.allShipsSunk()
    ) {
      this.isGameOver = true;
    }
  }

  // execute player attack
  executePlayerTurn(index) {
    console.log(`Player's attack at index: ${index}`)
    const isValidMove = this.player.playTurn(index);

    console.log("Opponent ships that have been hit:");
    this.opponent.opponentBoard.ships.forEach((ship) => {
      console.log(ship.hits);
    });

    if (isValidMove) {
      this.checkGameOver();
      this.turn = this.opponent;
      return true;
    } else {
      return false;
    }
  }

  executeComputerTurn() {
    const index = this.opponent.playTurn();

    console.log("Player ships that have been hit:");
    this.player.playerBoard.ships.forEach((ship) => {
      console.log(ship.hits);
    });

    this.checkGameOver();
    this.turn = this.player;
    return index;
  }

  returnWinner() {
    const winner = this.player.playerBoard.allShipsSunk()
      ? this.opponent
      : this.player;
    return winner;
  }
}

export default GameLoop;
