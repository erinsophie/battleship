class Game {
  constructor(player, opponent, ui) {
    // so we know the status of each game board
    this.player = player;
    this.opponent = opponent;
    this.turn = this.player;
    this.isGameOver = false;
    this.ui = ui;
  }

  // check if game is over
  checkGameOver() {
    if (
      this.player.playerBoard.allShipsSunk() ||
      this.opponent.opponentBoard.allShipsSunk()
    ) {
      this.isGameOver = true;
      this.displayWinner();
    }
  }

  // taking turns
  // Controller handles the interaction
  switchTurn(index) {
    if (this.turn === this.player) {
      this.player.playTurn(index);
      this.turn = this.opponent;
    } else if (this.turn === this.opponent) {
      this.opponent.playTurn();
      this.turn = this.player;
    }
    this.checkGameOver();
    this.ui.updateBoards(this.player, this.opponent);
  }

  returnWinner() {
    let winner = this.player.playerBoard.allShipsSunk() ? opponent : player;
    return winner;
  }
}

export default Game;
