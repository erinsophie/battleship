class GameUI {
  constructor(player, opponent) {
    this.player = player;
    this.opponent = opponent;

    this.initEmptyBoards();
    this.initPlayerBoard(this.player);
  }

  initEmptyBoards() {
    const boards = document.querySelectorAll(".board");

    boards.forEach((board) => {
      for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = i;
        board.appendChild(cell);
      }
    });
  }

  initPlayerBoard(player) {
    const playerCells = player.playerBoard.cells;
    const playerBoardElement = document.querySelector(".player-board");

    // loop through player cells array
    playerCells.forEach((cell, index) => {
      const cellElement = playerBoardElement.querySelector(
        `.cell[data-index='${index}']`
      );
      // display players ships
      if (cell.occupied) cellElement.classList.add("ship");
    });
  }

  // this is called after every turn
  updateBoards(player, opponent) {
    this.updatePlayerBoard(player);
    this.updateOpponentBoard(opponent);
  }

  updatePlayerBoard(player) {
    const playerCells = player.playerBoard.cells;
    const playerBoardElement = document.querySelector(".player-board");

    // loop through player cells array
    playerCells.forEach((cell, index) => {
      const cellElement = playerBoardElement.querySelector(
        `.cell[data-index='${index}']`
      );
      // mark as attempted
      if (cell.attempted) cellElement.classList.add("dot");
      // if opponent hits a ship
      if (cell.occupied) cellElement.classList.add("hit-ship");
    });
  }

  updateOpponentBoard(opponent) {
    const opponentCells = opponent.opponentBoard.cells;
    const opponentBoardElement = document.querySelector(".opponent-board");

    opponentCells.forEach((cell, index) => {
      const cellElement = opponentBoardElement.querySelector(
        `.cell[data-index='${index}']`
      );
      // mark as attempted
      if (cell.attempted) cellElement.classList.add("dot");
    });
  }
}

export default GameUI;
