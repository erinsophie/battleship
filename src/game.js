import Player from "./player.js";
import Opponent from "./opponent.js";
import Gameboard from "./gameboard.js";

//Game status check: Check whether the game is still ongoing or if one player has won (i.e., all of the other player's ships have been sunk). This should call an appropriate method on the game board object to check the status of the ships.

class Game {
  constructor(player, opponent) {
    this.player = player;
    this.opponent = opponent;
    this.turn = this.player;
    this.isGameOver = false;
  }

  initGame() {
    this.opponent.initBoard();
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
  switchTurn() {
    if (this.turn === this.player) {
      // let player go first
      this.player.playTurn(32);
      // then switch to opponent turn
      this.turn = this.opponent;
    } else if (this.turn === this.opponent) {
      // wait 2 seconds for computer to take their shot
      this.opponent.playTurn();
      // switch turn
      this.turn = this.player;
    }
    // at the end of every turn, check if game is over
    this.checkGameOver();
  }

  // display winner
  displayWinner() {
    let winner = this.player.playerBoard.allShipsSunk() ? opponent : player;

    if (winner === this.player) {
      console.log(
        `Congratulations ${this.player.name}, you sunk all of the enemy's ships!`
      );
    } else {
      console.log(`You lost! The enemy sunk all your ships!`);
    }
  }
}

export default Game;
