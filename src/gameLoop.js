// Set up a new game by creating Players and Gameboards with predetermined coordinates.
// Step through the game turn by turn using methods from other objects.
// End the game once all ships of a player have been sunk.

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
    const isValidMove = this.player.playTurn(index);

    if (isValidMove) {
      this.checkGameOver();
      this.turn = this.player;
      return true;
    } else {
      return false;
    }
  }

  executeComputerTurn() {
    const index = this.opponent.playTurn();
    this.checkGameOver();
    this.turn = this.opponent;
    return index;
  }

  returnWinner() {
    let winner = this.player.playerBoard.allShipsSunk() ? opponent : player;
    return winner;
  }
}

export default GameLoop;
