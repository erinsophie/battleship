import Gameboard from "./gameboard.js";

// opponents board
class Opponent {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }
}
