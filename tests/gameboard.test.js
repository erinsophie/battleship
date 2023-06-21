import Gameboard from "../src/gameboard";

describe("gameboard functionality", () => {
  let gameboard;
  beforeEach(() => (gameboard = new Gameboard()));

  test("Initialises gameboard with 100 cells", () => {
    expect(gameboard.cells).toHaveLength(100);
  });

  test("Checks if placement of ship is valid", () => {
    expect(gameboard.isValidPlacement(12, 3, "x")).toBeTruthy();
    expect(gameboard.isValidPlacement(7, 5, "x")).toBe(false);
  });

  test("Places ship if positions are valid", () => {
    gameboard.placeShip(12, 3, "x");
    expect(gameboard.cells[14].occupied).toBe(false);
    expect(gameboard.cells[12].occupied).toBe(true);
    expect(gameboard.cells[13].occupied).toBe(true);
    expect(gameboard.cells[14].occupied).toBe(true);
    expect(gameboard.cells[14].occupied).toBe(false);
  });
});
