import Gameboard from "./gameboard.js";
import Player from "./player.js";
import Opponent from "./opponent.js";

class GameLoop {
  constructor() {
    const playerBoard = new Gameboard();
    const opponentBoard = new Gameboard();
    this.player = new Player("Player", playerBoard, opponentBoard);
    this.opponent = new Opponent("Opponent", opponentBoard, playerBoard);
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
    // if game is over or if it's still opponent's, prevent attack
    if (this.isGameOver || this.turn === this.opponent) return;

    // attack only happens if cell is valid,
    // meaning it hasnt been attacked before
    const isValidMove = this.player.playTurn(index);

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
