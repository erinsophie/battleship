import Ship from "../src/ship.js";

describe("ship properties and functions", () => {
  let ship;

  beforeEach(() => (ship = new Ship([0, 1, 2, 3])));

  test("Ship creates an object with correct properties", () => {
    expect(ship).toHaveProperty("positions", [0, 1, 2, 3]);
    expect(ship).toHaveProperty("length", 4);
    expect(ship).toHaveProperty("hits", []);
    expect(ship).toHaveProperty("hit");
    expect(ship).toHaveProperty("isSunk");
  });

  test("Adds new hits", () => {
    ship.hit(3);
    ship.hit(1);
    expect(ship.hits).toEqual([3, 1]);
  });

  test("Does not add already existing hits", () => {
    ship.hits = [3, 1];
    ship.hit(3);
    expect(ship.hits).toEqual([3, 1]);
  });

  test("Returns true if ship is sunk", () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);
    expect(ship.isSunk()).toBeTruthy();
  });

  test("Returns false if ship is not sunk", () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk()).toBe(false);
  });
});
