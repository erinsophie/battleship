import initGame from "./init.js";

class DOMInteraction {
  constructor(game, player, opponent) {
    this.game = game;
    this.player = player;
    this.opponent = opponent;
    this.shipsPlaced = 0;
    this.positions = [];
    this.axis = "x";
    this.placeShipsModal();
  }

  placeShipsModal() {
    // open modal and overlay
    this.openModal("place-ships-modal");

    // axis button
    const axisBtn = document.getElementById("axis-btn");
    axisBtn.addEventListener("click", () => {
      if (this.axis === "x") {
        this.axis = "y";
        axisBtn.textContent = "Y Axis";
      } else {
        this.axis = "x";
        axisBtn.textContent = "X Axis";
      }
    });

    // clear player board element
    const playerBoardElement = document.getElementById("temp-board");
    playerBoardElement.innerHTML = "";

    // start game btn
    const startGameBtn = document.getElementById("start-game-btn");
    startGameBtn.addEventListener("click", () => {
      if (this.shipsPlaced === 5) this.startGame();
    });

    // create 100 divs
    for (let i = 0; i < 100; i++) {
      let cellElement = document.createElement("div");
      cellElement.dataset.index = i;
      cellElement.classList.add("cell");

      // show player potential placement of ship
      cellElement.addEventListener("mouseover", () =>
        this.showPotentialPlacement(i)
      );
      // remove classes on mouse out
      cellElement.addEventListener("mouseout", () => this.mouseOut(i));

      // when clicked, place ship here
      cellElement.addEventListener("click", () => this.handlePlacement(i));
      // append cells to board element
      playerBoardElement.append(cellElement);
    }

    // update which ship to place
    this.updateShipMsg();
  }

  updateShipMsg() {
    const shipMessages = [
      "Place your destroyer",
      "Place your submarine",
      "Place your cruiser",
      "Place your battleship",
      "Place your carrier",
      "Your fleet is ready!",
    ];

    const msg = document.getElementById("ship-msg");
    msg.textContent = shipMessages[this.shipsPlaced];
  }

  getShipProperties(index) {
    const length = this.player.shipSizes[this.shipsPlaced];
    const axis = this.axis;
    const end = axis === "x" ? index + (length - 1) : index + (length - 1) * 10;
    const step = axis === "x" ? 1 : 10;

    return { length, axis, end, step };
  }

  mouseOut(index) {
    const { end, step } = this.getShipProperties(index);

    for (let i = index; i <= end; i += step) {
      const cellElement = document.querySelector(`[data-index="${i}"]`);
      if (cellElement) {
        cellElement.classList.remove("valid-placement");
      }
    }
  }

  showPotentialPlacement(index) {
    const { length, axis, end, step } = this.getShipProperties(index);

    for (let i = index; i <= end; i += step) {
      const cellElement = document.querySelector(`[data-index="${i}"]`);
      if (this.player.playerBoard.isValidPlacement(index, length, axis)) {
        cellElement.classList.add("valid-placement");
      }
    }
  }

  handlePlacement(index) {
    if (this.shipsPlaced === 5) return;
    const { length, axis, end, step } = this.getShipProperties(index);

    // if placement is valid, place ship
    if (this.player.playerBoard.placeShip(index, length, axis)) {
      this.shipsPlaced++;

      for (let i = index; i <= end; i += step) {
        const cellElement = document.querySelector(`[data-index="${i}"]`);
        cellElement.classList.add("ship");
        cellElement.classList.remove("valid-placement");
      }
    }

    this.updateShipMsg();
  }

  startGame() {
    this.closeModal("place-ships-modal");
    this.init();
  }

  checkIfShipSunk(board) {
    board.ships.forEach((ship) => {
      if (ship.isSunk()) {
        ship.positions.forEach((position) => {
          const stringPosition = position.toString();
          const boardId =
            board === this.player.playerBoard
              ? "player-board"
              : "opponent-board";
          const cellElement = document.querySelector(
            `#${boardId} [data-index="${stringPosition}"]`
          );
          if (cellElement) {
            cellElement.classList.remove("attempted");
            cellElement.classList.remove("hit");
            cellElement.classList.remove("ship");
            cellElement.classList.add("sunk");
          }
        });
      }
    });
  }

  renderBoard(board, boardId) {
    const boardElement = document.getElementById(boardId);
    boardElement.innerHTML = "";

    board.cells.forEach((cell, index) => {
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
        // append cells to board element
      }

      // if the board is the player's board
      if (this.player.playerBoard === board) {
        // show player their ships
        if (cell.occupied) cellElement.classList.add("ship");
      } else {
        // if its the opponent's board, add event listener to allow clicks on cells
        cellElement.addEventListener("click", this.handleCellClick.bind(this));
      }
      this.checkIfShipSunk(board);
      // append cells to board
      boardElement.appendChild(cellElement);
    });
  }

  // update both boards on each turn
  updateBoards() {
    this.renderBoard(this.player.playerBoard, "player-board");
    this.renderBoard(this.opponent.opponentBoard, "opponent-board");
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
        // if so, display winner
        this.displayWinner();
        // if not, execute computer turn
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

    console.log("Player board misses:");
    console.log(this.player.playerBoard.misses);
    console.log("Opponent board misses:");
    console.log(this.opponent.opponentBoard.misses);
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
    const messageElement = document.getElementById("turns-msg");
    messageElement.textContent = message;
  }

  // Method to display the winner
  displayWinner() {
    const winner = this.game.returnWinner();

    // activate modal and overlay
    this.openModal("winner-modal");
    const message = document.getElementById("winner-name");
    message.textContent = `${winner.name} wins!`;

    // new game button
    const newGameBtn = document.getElementById("new-game-btn");
    newGameBtn.addEventListener("click", () => {
      this.closeModal("winner-modal");
      // create a new game loop and new dom
      this.newGame();
    });
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add("active");
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove("active");
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("active");
  }

  newGame() {
    // reset game boards in dom
    this.resetBoard("player-board");
    this.resetBoard("opponent-board");
    // create new game loop and dom
    initGame();
  }

  resetBoard(boardElementId) {
    const boardElement = document.getElementById(boardElementId);
    boardElement.innerHTML = "";
  }

  // Method to initialize the game
  init() {
    this.updateBoards();
    this.displayMessage(`${this.player.name}, take the first shot!`);
  }
}

export default DOMInteraction;
