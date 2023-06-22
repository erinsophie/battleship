import Gameboard from "../src/gameboard.js";

let gameboard;
beforeEach(() => (gameboard = new Gameboard()));

describe("Placement of ships", () => {
  test("Initialises gameboard with 100 cells", () => {
    expect(gameboard.cells).toHaveLength(100);
  });

  test("Checks if placement of ship is valid", () => {
    expect(gameboard.isValidPlacement(12, 3, "x")).toBeTruthy();
    expect(gameboard.isValidPlacement(7, 5, "x")).toBe(false);
    expect(gameboard.isValidPlacement(28, 4, "y")).toBeTruthy();
    expect(gameboard.isValidPlacement(72, 5, "y")).toBe(false);
  });

  test("Marks correct cells as occupied if position is valid", () => {
    gameboard.placeShip(12, 3, "x");
    expect(gameboard.cells[11].occupied).toBe(false);
    expect(gameboard.cells[12].occupied).toBe(true);
    expect(gameboard.cells[13].occupied).toBe(true);
    expect(gameboard.cells[14].occupied).toBe(true);
    expect(gameboard.cells[15].occupied).toBe(false);
  });

  test("Marks correct cells as occupied if position is valid on y axis", () => {
    gameboard.placeShip(10, 3, "y");
    expect(gameboard.cells[0].occupied).toBe(false);
    expect(gameboard.cells[10].occupied).toBe(true);
    expect(gameboard.cells[20].occupied).toBe(true);
    expect(gameboard.cells[30].occupied).toBe(true);
    expect(gameboard.cells[40].occupied).toBe(false);
  });

  test("Does not let player place ship if it conflicts with other ships", () => {
    gameboard.placeShip(0, 3, "y");
    gameboard.placeShip(10, 3, "y");
    expect(gameboard.ships).toHaveLength(1);
  });

  test("Adds new ship to ships array when placed", () => {
    gameboard.placeShip(12, 3, "x");
    expect(gameboard.ships).toHaveLength(1);
    expect(gameboard.ships[0].positions).toEqual([12, 13, 14]);
  });

  test("Adds new ship on y axis", () => {
    gameboard.placeShip(10, 3, "y");
    expect(gameboard.ships).toHaveLength(1);
    expect(gameboard.ships[0].positions).toEqual([10, 20, 30]);
  });
});

describe("Attacking cells", () => {
  test("If a cell gets attacked, it is marked as attempted", () => {
    gameboard.placeShip(41, 3, "x");
    gameboard.attack(41);
    expect(gameboard.cells[41].attempted).toBeTruthy();
  });
});
