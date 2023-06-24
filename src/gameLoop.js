// Set up a new game by creating Players and Gameboards with predetermined coordinates.
// Step through the game turn by turn using methods from other objects.
// End the game once all ships of a player have been sunk.

class GameLoop {
  constructor(player, opponent) {
    // so we know the status of each game board
    this.player = player;
    this.opponent = opponent;
    this.turn = this.player;
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

  // taking turns
  switchTurn(index) {
    if (this.turn === this.player) {
      this.player.playTurn(index);
      this.turn = this.opponent;
    } else if (this.turn === this.opponent) {
      this.opponent.playTurn();
      this.turn = this.player;
    }
    this.checkGameOver();
  }

  returnWinner() {
    let winner = this.player.playerBoard.allShipsSunk() ? opponent : player;
    return winner;
  }
}

export default GameLoop;
