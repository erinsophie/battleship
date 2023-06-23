import Gameboard from "../src/gameboard.js";
import Player from "../src/player.js";

describe("basic player methods", () => {
  let player;
  let playerBoard;
  let opponentBoard;
  let name;

  beforeEach(() => {
    playerBoard = new Gameboard();
    opponentBoard = new Gameboard();
    name = "Amy";
    player = new Player(name, playerBoard, opponentBoard);
  });

  test("Player is created with name, gameboard and opponent board", () => {
    expect(player).toHaveProperty("name", "Amy");
    expect(player.playerBoard).toMatchObject(playerBoard);
    expect(player.opponentBoard).toMatchObject(opponentBoard);
  });

  test("Player can place no more than 5 ships", () => {
    player.placePlayerShip(15, 4, "x");
    player.placePlayerShip(32, 5, "y");
    player.placePlayerShip(34, 3, "x");
    player.placePlayerShip(59, 2, "y");
    player.placePlayerShip(86, 3, "x");
    player.placePlayerShip(0, 3, "x");
    expect(playerBoard.ships).toHaveLength(5);
  });

  test("Does not allow player to place ship in invalid place", () => {
    player.placePlayerShip(15, 4, "x");
    player.placePlayerShip(17, 5, "y");
    expect(playerBoard.ships).toHaveLength(1);
    expect(playerBoard.ships[0].positions).toEqual([15, 16, 17, 18]);
  });

  test("Player can hit opponent's ship", () => {
    opponentBoard.placeShip(44, 2, "y");
    player.playTurn(44);
    expect(opponentBoard.ships[0].hits).toEqual([44]);
    expect(opponentBoard.cells[44].attempted).toBeTruthy();
  });

  test("Records misses on opponent board", () => {
    opponentBoard.placeShip(44, 2, "y");
    player.playTurn(10);
    expect(opponentBoard.misses).toHaveLength(1);
    expect(opponentBoard.misses).toEqual([10]);
    expect(opponentBoard.cells[10].attempted).toBeTruthy();
  });
});
