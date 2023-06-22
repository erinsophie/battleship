import Opponent from "../src/opponent-ai.js";
import Gameboard from "../src/gameboard.js";

describe("Ai methods", () => {
  let opponent;

  // create temporary gameboard for testing
  let playerBoard = new Gameboard();
  playerBoard.placeShip(12, 5, "x");
  playerBoard.placeShip(61, 4, "x");
  playerBoard.placeShip(36, 3, "x");
  playerBoard.placeShip(76, 3, "y");
  playerBoard.placeShip(81, 2, "y");

  let opponentBoard = new Gameboard();
  beforeEach(() => (opponent = new Opponent("Enemy", opponentBoard)));

  test("Creates opponent board with name and own gameboard", () => {
    expect(opponent).toHaveProperty("name", "Enemy");
    expect(opponent).toHaveProperty("gameboard", opponentBoard);
  });

  test("Randomly places 5 ships on its board", () => {
    expect(opponent.gameboard.ships).toHaveLength(5);
  });

  test("Opponent can hit ship on player board", () => {
    opponent.attack(38, playerBoard);

    const anyShipHit = playerBoard.ships.some((ship) => ship.hits.includes(38));
    expect(anyShipHit).toBeTruthy();
    expect(playerBoard.missedAttacks).toEqual([]);
  });

  test("If opponent misses, it is recorded as a miss on player board", () => {
    opponent.attack(75, playerBoard);

    const anyShipHit = playerBoard.ships.every(
      (ship) => ship.hits.length === 0
    );

    expect(anyShipHit).toBe(false);
    expect(playerBoard.missedAttacks).toEqual([75]);
  });
});
