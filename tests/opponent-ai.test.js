import Opponent from "../src/opponent-ai.js";
import Gameboard from "../src/gameboard.js";

describe("Opponent methods", () => {
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

  test("Opponent attacks random index on player's board", () => {
    let missedAttacks = 0;
    let hits = 0;

    opponent.attack(playerBoard);

    console.log(playerBoard.missedAttacks);
    console.log(playerBoard.ships.forEach((ship) => console.log(ship.hits)));

    if (playerBoard.missedAttacks.length > 0) missedAttacks++;
    playerBoard.ships.forEach((ship) => {
      if (ship.hits > 0) hits++;
    });

    expect(missedAttacks || hits).toBeGreaterThan(0);
  });
});
