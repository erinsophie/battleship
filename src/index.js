import Player from "./player.js";
import Opponent from "./opponent.js";
import Gameboard from "./gameboard.js";
import GameLoop from "./gameLoop.js";
import DOMInteraction from "./dom.js";

// Initialize player's and opponent's gameboards
const playerBoard = new Gameboard();
const opponentBoard = new Gameboard();

// Place the player's ships
playerBoard.placeShip(0, 5, "x");
playerBoard.placeShip(17, 4, "y");
playerBoard.placeShip(32, 3, "x");
playerBoard.placeShip(55, 3, "y");
playerBoard.placeShip(61, 2, "x");

// Initialize player and opponent
const player = new Player("Player", playerBoard, opponentBoard);
const opponent = new Opponent("Opponent", opponentBoard, playerBoard);

// Initialize the game
const game = new GameLoop(player, opponent);

// Initialize the DOM Interaction module
const domInteraction = new DOMInteraction(game, player, opponent);

// Start the game
domInteraction.init();
