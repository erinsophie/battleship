import Player from "../src/player.js";
import Gameboard from "../src/gameboard.js";

describe("Player methods", () => {
  let player;

  // create temporary gameboard for testing
  let opponentBoard = new Gameboard();
  opponentBoard.placeShip(12, 5, "x");
  opponentBoard.placeShip(61, 4, "x");
  opponentBoard.placeShip(36, 3, "x");
  opponentBoard.placeShip(76, 3, "y");
  opponentBoard.placeShip(81, 2, "y");

  let playerBoard = new Gameboard();
  beforeEach(() => (player = new Player("Amy", playerBoard)));

  test("Creates player with name and own gameboard", () => {
    expect(player).toHaveProperty("name", "Amy");
    expect(player).toHaveProperty("gameboard", playerBoard);
  });

  test("Let's player place 5 ships max", () => {
    player.placePlayerShip(0, 3, "y");
    player.placePlayerShip(37, 4, "y");
    player.placePlayerShip(54, 2, "x");
    player.placePlayerShip(61, 5, "x");
    player.placePlayerShip(87, 3, "x");
    player.placePlayerShip(2, 3, "x");
    expect(player.gameboard.ships).toHaveLength(5);
  });

  test("Player can hit ship on opponent board", () => {
    player.attack(12, opponentBoard);

    const anyShipHit = opponentBoard.ships.some((ship) =>
      ship.hits.includes(12)
    );
    expect(anyShipHit).toBeTruthy();
    expect(opponentBoard.missedAttacks).toEqual([]);
  });

  test("If player misses, it is recorded as a miss on opponent board", () => {
    player.attack(75, opponentBoard);

    const anyShipHit = opponentBoard.ships.every(
      (ship) => ship.hits.length === 0
    );

    expect(anyShipHit).toBe(false);
    expect(opponentBoard.missedAttacks).toEqual([75]);
  });
});
