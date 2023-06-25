import Player from "../src/player.js";
import Opponent from "../src/opponent.js";
import Gameboard from "../src/gameboard.js";
import GameLoop from "../src/gameLoop.js";

describe("Game loop logic", () => {
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

  const game = new GameLoop(player, opponent);

  test("Sets up game correctly", () => {
    expect(game.player).toEqual(player);
    expect(game.opponent).toEqual(opponent);
    expect(game.isGameOver).toBeFalsy();
  });

  test("Updates who's turn it is", () => {
    game.executeComputerTurn();
    expect(game.turn).toEqual(player);
    game.executePlayerTurn(67);
    expect(game.turn).toEqual(opponent);
    game.executeComputerTurn();
    expect(game.turn).toEqual(player);
  });
});

test("Game ends and opponent wins when all player ships are sunk", () => {
  // Mock Player and Opponent
  const mockPlayer = {
    name: "Player",
    playerBoard: {
      allShipsSunk: jest.fn(),
    },
  };

  const mockOpponent = {
    name: "Opponent",
    opponentBoard: {
      allShipsSunk: jest.fn(),
    },
  };

  const gameLoop = new GameLoop(mockPlayer, mockOpponent);

  // Mock the player's allShipsSunk method to return true
  mockPlayer.playerBoard.allShipsSunk.mockReturnValue(true);

  // Check if game over condition is met
  gameLoop.checkGameOver();

  // Expect game to be over
  expect(gameLoop.isGameOver).toBe(true);

  // Expect the winner to be the opponent
  const winner = gameLoop.returnWinner();
  expect(winner).toBe(mockOpponent);
});

test("Game ends and player wins when all opponent ships are sunk", () => {
  // Mock Player and Opponent
  const mockPlayer = {
    name: "Player",
    playerBoard: {
      allShipsSunk: jest.fn(),
    },
  };

  const mockOpponent = {
    name: "Opponent",
    opponentBoard: {
      allShipsSunk: jest.fn(),
    },
  };

  const gameLoop = new GameLoop(mockPlayer, mockOpponent);

  mockOpponent.opponentBoard.allShipsSunk.mockReturnValue(true);
  gameLoop.checkGameOver();

  expect(gameLoop.isGameOver).toBe(true);
  
  const winner = gameLoop.returnWinner();
  expect(winner).toBe(mockPlayer);
});
