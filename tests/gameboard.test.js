import Gameboard from "../src/gameboard.js";

let gameboard;
beforeEach(() => (gameboard = new Gameboard()));

// placing ships
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

  test.only("Counts ships correctly", () => {
    gameboard.placeShip(10, 5, "x");
    gameboard.placeShip(20, 4, "x");
    gameboard.placeShip(30, 3, "x");
    gameboard.placeShip(40, 3, "x");
    gameboard.placeShip(50, 2, "x");
    expect(gameboard.ships).toHaveLength(5);
    expect(gameboard.ships[4].positions).toEqual([50, 51])
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

// attacking cells
describe("Attacking cells", () => {
  test("If a cell gets attacked, it is marked as attempted", () => {
    gameboard.placeShip(41, 3, "x");
    gameboard.attack(41);
    expect(gameboard.cells[41].attempted).toBeTruthy();
  });

  test("Marks ship as hit", () => {
    gameboard.placeShip(41, 3, "x");
    gameboard.attack(41);
    expect(gameboard.ships[0].hits).toEqual([41]);
    expect(gameboard.cells[41].occupied).toBeTruthy();
    expect(gameboard.cells[41].attempted).toBeTruthy();
  });

  test("No ship hit adds miss to array", () => {
    gameboard.placeShip(41, 3, "x");
    gameboard.attack(12);
    expect(gameboard.misses).toEqual([12]);
    expect(gameboard.cells[12].attempted).toBeTruthy();
    expect(gameboard.cells[12].occupied).toBeFalsy();
  });
});

// end of game
describe("End of game conditions", () => {
  test("Game knows when all ships are sunk", () => {
    gameboard.placeShip(41, 3, "x");
    gameboard.placeShip(56, 2, "x");
    gameboard.attack(41);
    gameboard.attack(42);
    gameboard.attack(43);
    gameboard.attack(56);
    gameboard.attack(57);
    expect(gameboard.allShipsSunk()).toBeTruthy();
  });

  test("Game knows when all ships are not sunk", () => {
    gameboard.placeShip(41, 3, "x");
    gameboard.placeShip(56, 2, "x");
    gameboard.attack(41);
    gameboard.attack(42);
    gameboard.attack(43);
    expect(gameboard.allShipsSunk()).toBeFalsy();
  });
});
