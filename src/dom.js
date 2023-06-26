import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

class DOMInteraction {
  constructor(game, player, opponent) {
    this.game = game;
    this.player = player;
    this.opponent = opponent;
    this.shipsPlaced = 0;
    this.positions = [];
    this.axis = "x";
  }

  placeShipsModal() {
    // create modal and overlay
    const modal = document.getElementById("place-ships");
    modal.innerHTML = "";
    modal.classList.add("active");
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");

    // create axis button
    const axisBtn = document.createElement("button");
    axisBtn.classList.add("axis-btn");
    axisBtn.textContent = "X Axis";
    axisBtn.addEventListener("click", () => {
      this.axis === "x" ? (this.axis = "y") : (this.axis = "x");
    });

    // create player board element
    const playerBoardElement = document.createElement("div");
    playerBoardElement.classList.add("board");

    // create start game button
    const startGameBtn = document.createElement("button");
    startGameBtn.classList.add("start-game-btn");
    startGameBtn.textContent = "Start Game";
    startGameBtn.addEventListener("click", () => {
      if (this.shipsPlaced === 5) this.finishPlacement();
    });

    // create gameboard object
    const newGameboard = new Gameboard();

    // create 100 divs
    newGameboard.cells.forEach((cell, index) => {
      let cellElement = document.createElement("div");
      cellElement.dataset.index = index;
      cellElement.classList.add("cell");
      cellElement.classList.add("ship-placement");

      cellElement.addEventListener("click", () =>
        this.handlePlacement(index, newGameboard)
      );
      playerBoardElement.append(cellElement);
    });

    modal.appendChild(axisBtn);
    modal.appendChild(playerBoardElement);
    modal.appendChild(startGameBtn);
  }

  handlePlacement(index, board) {
    if (this.shipsPlaced === 5) return;

    const length = this.game.player.shipSizes[this.shipsPlaced];
    const axis = this.axis;

    if (board.isValidPlacement(index, length, axis)) {
      const end =
        axis === "x" ? index + (length - 1) : index + (length - 1) * 10;
      const positions = [];

      for (let i = index; i <= end; i += axis === "x" ? 1 : 10) {
        positions.push(i);
      }

      this.positions.push(positions);
      this.shipsPlaced++;
      console.log(this.positions);
      console.log(this.shipsPlaced);
    } else {
      return;
    }
  }

  finishPlacement() {
    this.positions.forEach((positions, i) => {
      const ship = new Ship(positions);
      this.player.playerBoard.ships[i] = ship;

      positions.forEach((pos) => {
        this.player.playerBoard.cells[pos].markAsOccupied();
      });
    });

    const modal = document.getElementById("place-ships");
    modal.classList.remove("active");
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("active");

    this.init(); //when player has placed all ships, now we start the game
  }

  // render computer board
  renderOpponentBoard(board) {
    const boardElement = document.getElementById("opponent-board");
    boardElement.innerHTML = "";

    board.cells.forEach((cell, index) => {
      // Create a new div for each cell object
      let cellElement = document.createElement("div");
      cellElement.dataset.index = index;
      cellElement.classList.add("cell");

      // change hover color based on if it's a valid place to take a shot
      !cell.attempted
        ? cellElement.classList.add("valid")
        : cellElement.classList.add("invalid");

      // when a cell is clicked mark with a dot
      if (cell.attempted) {
        cellElement.classList.add("attempted");
        // if it hits a ship
        if (cell.occupied) cellElement.classList.add("hit");
      }

      // add event listener to each cell
      cellElement.addEventListener("click", this.handleCellClick.bind(this));
      boardElement.appendChild(cellElement);
    });
  }

  // render player board
  renderPlayerBoard(board) {
    const boardElement = document.getElementById("player-board");
    boardElement.innerHTML = "";

    board.cells.forEach((cell, index) => {
      // Create a new div for each cell object
      let cellElement = document.createElement("div");
      cellElement.dataset.index = index;
      cellElement.classList.add("cell");

      // show player their ships
      if (cell.occupied) cellElement.classList.add("ship");

      if (cell.attempted) {
        cellElement.classList.add("attempted");
        // if it hits a ship
        if (cell.occupied) cellElement.classList.add("hit");
      }

      boardElement.appendChild(cellElement);
    });
  }

  // update both boards on each turn
  updateBoards() {
    this.renderPlayerBoard(this.player.playerBoard);
    this.renderOpponentBoard(this.opponent.opponentBoard);
  }

  handleCellClick(event) {
    const cellIndex = parseInt(event.target.dataset.index);
    // execute player's turn
    const playerTookTurn = this.game.executePlayerTurn(cellIndex);

    // if player took their turn
    if (playerTookTurn) {
      this.updateBoards();
      this.updateMessage(cellIndex);

      // Check if game is over after player's turn
      if (this.game.isGameOver) {
        this.displayWinner();
      } else {
        // Wrap the computer's turn inside a Promise
        new Promise((resolve) => {
          setTimeout(() => {
            const computerChosenIndex = this.game.executeComputerTurn();
            this.updateBoards();
            this.updateMessage(computerChosenIndex);

            resolve(); // Resolve the promise
          }, 1000);
        }).then(() => {
          // Check if game is over after the promise is resolved (computer's turn)
          if (this.game.isGameOver) {
            this.displayWinner();
          }
        });
      }
    } else if (!this.game.isGameOver) {
      this.displayMessage("You have already fired here!");
    }
  }

  updateMessage(cellIndex) {
    const playerMiss = `You fire a shot and...it's a miss!`;
    const playerHit = `You fire a shot and...it's a hit!`;
    const opponentMiss = `Enemy fires a shot and...it's a miss!`;
    const opponentHit = `Enemy fires a shot and...it's a hit!`;

    if (this.game.turn === this.opponent) {
      const cell = this.opponent.opponentBoard.cells[cellIndex];
      cell.occupied
        ? this.displayMessage(playerHit)
        : this.displayMessage(playerMiss);
    }

    if (this.game.turn === this.player) {
      const cell = this.player.playerBoard.cells[cellIndex];
      cell.occupied
        ? this.displayMessage(opponentHit)
        : this.displayMessage(opponentMiss);
    }
  }

  // Method to display a message
  displayMessage(message) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
  }

  // Method to display the winner
  displayWinner() {
    const winner = this.game.returnWinner();

    // activate modal and overlay
    const modal = document.getElementById("winner-modal");
    modal.classList.add("active");
    const message = document.getElementById("winner-name");
    message.textContent = `Admiral ${winner.name} wins!`;
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
  }

  // Method to initialize the game
  init() {
    this.updateBoards();
    this.displayMessage(`${this.player.name}, take the first shot!`);
  }
}

export default DOMInteraction;
