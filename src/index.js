import Gameboard from "./gameboard.js";
import Player from "./player.js";
import Opponent from "./opponent.js";
import Ship from "./ship.js";
import Game from "./game.js";
import GameUI from "./ui.js";

const player = new Player("Player", new Gameboard(), new Gameboard());
const opponent = new Opponent("Opponent", new Gameboard(), new Gameboard());

// manually inserting player ships
player.placePlayerShip(10, 3, "x");
player.placePlayerShip(67, 2, "x");
player.placePlayerShip(20, 5, "y");
player.placePlayerShip(85, 4, "x");
player.placePlayerShip(90, 3, "x");

const ui = new GameUI(player, opponent); // View
const game = new Game(player, opponent, ui); // Controller

// Now the ships have been placed before creating UI
// and the game is created after the UI
game.ui.updateBoards(player, opponent); // Use player and opponent variables directly
