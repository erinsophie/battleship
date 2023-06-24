// Set up a new game by creating Players and Gameboards with predetermined coordinates.
// Step through the game turn by turn using methods from other objects.
// End the game once all ships of a player have been sunk.

class GameLoop {
  constructor(player, opponent) {
    // so we know the status of each game board
    this.player = player;
    this.opponent = opponent;
    this.isGameOver = false;
  }

  // check if game is over
  checkGameOver() {
    if (
      this.player.playerBoard.allShipsSunk() ||
      this.opponent.opponentBoard.allShipsSunk()
    ) {
      this.isGameOver = true;
      this.returnWinner();
    }
  }

  // execute player attack
  executePlayerTurn(index) {
    const isValidMove = this.player.playTurn(index);

    if (isValidMove) {
      this.checkGameOver();
      return true;
    } else {
      return false;
    }
  }

  executeComputerTurn() {
    this.checkGameOver();
    this.opponent.playTurn();
  }

  returnWinner() {
    let winner = this.player.playerBoard.allShipsSunk() ? opponent : player;
    return winner;
  }
}

export default GameLoop;
