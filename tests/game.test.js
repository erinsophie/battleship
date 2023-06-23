import Game from "../src/game.js";
import Player from "../src/player.js";
import Opponent from "../src/opponent.js";
import Gameboard from "../src/gameboard.js";

let game;
let player;
let playerBoard;
let opponent;
let opponentBoard;
let playerName;
let opponentName;

beforeEach(() => {
  playerName = "Amy";
  opponentName = "Computer";

  playerBoard = new Gameboard();
  opponentBoard = new Gameboard();

  player = new Player(playerName, playerBoard, opponentBoard);
  opponent = new Opponent(opponentName, opponentBoard, playerBoard);

  game = new Game(player, opponent);
  // manually add player ships
  game.player.placePlayerShip(15, 4, "x");
  game.player.placePlayerShip(32, 5, "y");
  game.player.placePlayerShip(34, 3, "x");
  game.player.placePlayerShip(59, 2, "y");
  game.player.placePlayerShip(86, 3, "x");
});

test("Both gameboards are correctly initialised", () => {
  expect(player.playerBoard.ships).toHaveLength(5);
  expect(opponent.opponentBoard.ships).toHaveLength(5);
});

test("Each player takes a turn", () => {
  // at start of game
  expect(game.turn).toEqual(player);
  game.switchTurn(32);
  expect(game.turn).toEqual(opponent);
  game.switchTurn();
  expect(game.turn).toEqual(player);
});
