import GameLoop from './gameLoop';
import DOMInteraction from './dom';

function initGame() {
  const game = new GameLoop();
  const domInteraction = new DOMInteraction(game, game.player, game.opponent);
}

export default initGame;
