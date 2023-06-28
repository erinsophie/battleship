import Gameboard from '../src/gameboard.js';
import Player from '../src/player.js';

describe('basic player methods', () => {
  let player;
  let playerBoard;
  let opponentBoard;

  beforeEach(() => {
    playerBoard = new Gameboard();
    opponentBoard = new Gameboard();
    opponentBoard.placeShip(44, 2, 'y');
    player = new Player('Player', playerBoard, opponentBoard);
  });

  test('Player is created with name, gameboard and opponent board', () => {
    expect(player).toHaveProperty('name', 'Player');
    expect(player.playerBoard).toMatchObject(playerBoard);
    expect(player.opponentBoard).toMatchObject(opponentBoard);
  });

  test("Player can hit opponent's ship", () => {
    player.playTurn(44);
    expect(opponentBoard.ships[0].hits).toEqual([44]);
    expect(opponentBoard.cells[44].attempted).toBeTruthy();
  });

  test('Records misses on opponent board', () => {
    player.playTurn(10);
    expect(opponentBoard.misses).toHaveLength(1);
    expect(opponentBoard.misses).toEqual([10]);
    expect(opponentBoard.cells[10].attempted).toBeTruthy();
  });

  test('Player cannot attack cell that has already been attempted', () => {
    player.playTurn(12);
    expect(opponentBoard.misses).toEqual([12]);
    expect(opponentBoard.cells[12].attempted).toBeTruthy();

    player.playTurn(12);
    expect(opponentBoard.misses).toHaveLength(1);
  });
});
