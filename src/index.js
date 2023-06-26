import GameLoop from "./gameLoop.js";
import DOMInteraction from "./dom.js";

// Initialize the game
const game = new GameLoop();

const domInteraction = new DOMInteraction(game, game.player, game.opponent);

game.opponent.opponentBoard.ships.forEach((ship) =>
  console.log(ship.positions)
);
