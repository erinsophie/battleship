import GameLoop from '../src/gameLoop.js';

describe('Game end conditions', () => {
  let mockPlayer;
  let mockOpponent;
  let gameLoop;

  beforeEach(() => {
    // Mock Player and Opponent
    mockPlayer = {
      name: 'Player',
      playerBoard: {
        allShipsSunk: jest.fn(),
      },
    };

    mockOpponent = {
      name: 'Opponent',
      opponentBoard: {
        allShipsSunk: jest.fn(),
      },
    };

    gameLoop = new GameLoop();
    gameLoop.player = mockPlayer;
    gameLoop.opponent = mockOpponent;
  });

  test('Game ends and opponent wins when all player ships are sunk', () => {
    // Mock the player's allShipsSunk method to return true
    mockPlayer.playerBoard.allShipsSunk.mockReturnValue(true);

    // Check if game over condition is met
    gameLoop.checkGameOver();

    // Expect game to be over
    expect(gameLoop.isGameOver).toBe(true);

    // Expect the winner to be the opponent
    const winner = gameLoop.returnWinner();
    expect(winner).toBe(mockOpponent);
  });

  test('Game ends and player wins when all opponent ships are sunk', () => {
    mockOpponent.opponentBoard.allShipsSunk.mockReturnValue(true);
    gameLoop.checkGameOver();

    expect(gameLoop.isGameOver).toBe(true);

    const winner = gameLoop.returnWinner();
    expect(winner).toBe(mockPlayer);
  });
});
