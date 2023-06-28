import GameLoop from './gameLoop.js';
import DOMInteraction from './dom.js';

function initGame() {
  const game = new GameLoop();
  const domInteraction = new DOMInteraction(game, game.player, game.opponent);
}

export default initGame;
