import Player from "../src/player.js";
import Opponent from "../src/opponent.js";
import Gameboard from "../src/gameboard.js";
import GameLoop from "../src/gameLoop.js";

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

let game;
beforeEach(() => (game = new GameLoop(player, opponent)));

describe("Game loop logic", () => {
  test("Sets up game correctly", () => {
    expect(game.player).toEqual(player);
    expect(game.opponent).toEqual(opponent);
    expect(game.isGameOver).toBeFalsy();
  });

  test("Player turn triggers opponent turn", () => {
    // mock computer turn
    game.executeComputerTurn = jest.fn();
    game.executePlayerTurn(12);

    expect(game.executeComputerTurn).toHaveBeenCalled();
  });
});
