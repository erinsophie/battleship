import Gameboard from './gameboard';
import Player from './player';
import Opponent from './opponent';

class GameLoop {
  constructor() {
    const playerBoard = new Gameboard();
    const opponentBoard = new Gameboard();
    this.player = new Player('Player', playerBoard, opponentBoard);
    this.opponent = new Opponent('Opponent', opponentBoard, playerBoard);
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

    // attack only happens if cell has not been attacked before
    const isValidMove = this.player.playTurn(index);

    if (isValidMove) {
      this.checkGameOver();
      this.turn = this.opponent;
      return true;
    }
    return false;
  }

  executeComputerTurn() {
    const index = this.opponent.playTurn();
    this.checkGameOver();
    this.turn = this.player;
    return index;
  }

  returnWinner() {
    return this.player.playerBoard.allShipsSunk() ? this.opponent : this.player;
  }
}

export default GameLoop;
