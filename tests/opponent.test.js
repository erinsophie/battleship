import Gameboard from "../src/gameboard.js";
import Opponent from "../src/opponent.js";

describe("opponent methods", () => {
  let opponent;
  let opponentBoard;
  let playerBoard;
  let name;

  beforeEach(() => {
    opponentBoard = new Gameboard();
    playerBoard = new Gameboard();
    name = "Computer";
    opponent = new Opponent(name, opponentBoard, playerBoard);
  });

  test("Opponent is created with name, gameboard and player board", () => {
    expect(opponent).toHaveProperty("name", "Computer");
    expect(opponent.opponentBoard).toMatchObject(opponentBoard);
    expect(opponent.playerBoard).toMatchObject(playerBoard);
  });

  test("Sets up board with 5 randomly placed ships", () => {
    expect(opponent.opponentBoard.ships).toHaveLength(5);
  });

  test("Computer correctly calls attack on player board", () => {
    playerBoard.placeShip(10, 3, "x");
    playerBoard.placeShip(25, 4, "x");
    playerBoard.placeShip(30, 5, "x");
    playerBoard.placeShip(57, 2, "x");
    playerBoard.placeShip(93, 3, "x");

    // Mock the attack method
    playerBoard.attack = jest.fn();

    // Run the opponent's turn
    opponent.playTurn();

    // Check if the mock attack function was called
    expect(playerBoard.attack).toHaveBeenCalled();
    expect(playerBoard.attack).toHaveBeenCalledTimes(1);

    // Check if it was called with a valid index
    const indexUsed = playerBoard.attack.mock.calls[0][0]; // Gets the first argument of the first call
    expect(indexUsed).toBeGreaterThanOrEqual(0);
    expect(indexUsed).toBeLessThan(100);
  });
});
