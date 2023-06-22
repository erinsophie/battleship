import Gameboard from "../src/gameboard.js";

describe("gameboard functionality", () => {
  let gameboard;
  beforeEach(() => (gameboard = new Gameboard()));

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

  test("Registers attack on a ship", () => {
    gameboard.placeShip(12, 3, "x");
    gameboard.receiveAttack(14);
    expect(gameboard.ships[0].hits).toEqual([14]);
    expect(gameboard.cells[14].attempted).toBeTruthy();
  });

  test("Registers attack on an empty cell", () => {
    gameboard.placeShip(12, 3, "x");
    gameboard.receiveAttack(22);
    expect(gameboard.missedAttacks).toEqual([22]);
    expect(gameboard.cells[22].attempted).toBeTruthy();
    expect(gameboard.cells[22].occupied).toBe(false);
  });

  test("Still works when called multiple times with same index", () => {
    gameboard.placeShip(12, 3, "x");
    gameboard.receiveAttack(12);
    gameboard.receiveAttack(12);
    gameboard.receiveAttack(12);
    gameboard.receiveAttack(12);
    expect(gameboard.ships[0].hits).toEqual([12]);
    expect(gameboard.cells[12].attempted).toBeTruthy();
    expect(gameboard.missedAttacks).toEqual([]);
  });

  test("Attacking empty cell twice is only registered once", () => {
    gameboard.receiveAttack(32);
    gameboard.receiveAttack(32);
    expect(gameboard.cells[32].attempted).toBeTruthy();
    expect(gameboard.missedAttacks).toEqual([32]);
    expect(gameboard.cells[32].occupied).toBe(false);
  });

  test("Sinks ship successfully", () => {
    gameboard.placeShip(12, 3, "x");
    gameboard.receiveAttack(12);
    gameboard.receiveAttack(13);
    gameboard.receiveAttack(14);
    expect(gameboard.ships[0].isSunk()).toBeTruthy();
  });

  test("Gameboards know when every ship has been sunk", () => {
    gameboard.placeShip(12, 2, "x");
    gameboard.placeShip(78, 2, "y");
    gameboard.receiveAttack(12);
    gameboard.receiveAttack(13);
    gameboard.receiveAttack(78);
    gameboard.receiveAttack(88);
    expect(gameboard.ships).toHaveLength(2);
    expect(gameboard.allShipsSunk()).toBeTruthy();
  });

  test("Gameboards know when every ship has not been sunk", () => {
    gameboard.placeShip(12, 2, "x");
    gameboard.placeShip(78, 2, "y");
    gameboard.receiveAttack(12);
    gameboard.receiveAttack(13);
    expect(gameboard.ships).toHaveLength(2);
    expect(gameboard.allShipsSunk()).toBe(false);
  });
});
