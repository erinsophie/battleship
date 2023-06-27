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
      if (this.axis === "x") {
        this.axis = "y";
        axisBtn.textContent = "Y Axis";
      } else {
        this.axis = "x";
        axisBtn.textContent = "X Axis";
      }
    });

    // message
    const placeShipMsg = document.createElement("p");
    placeShipMsg.classList.add("ship-msg");

    // create player board element
    const playerBoardElement = document.createElement("div");
    playerBoardElement.classList.add("board");
    playerBoardElement.classList.add("temp-board");

    const startGameBtn = document.createElement("button");
    startGameBtn.classList.add("start-game-btn");
    startGameBtn.textContent = "Start Game";
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
      cellElement.addEventListener("mouseout", () => this.mouseOut(i));

      // when clicked, place ship here
      cellElement.addEventListener("click", () => this.handlePlacement(i));
      playerBoardElement.append(cellElement);
    }

    modal.append(axisBtn, placeShipMsg, playerBoardElement, startGameBtn);
    this.updateShipMsg();
  }

  updateShipMsg() {
    const msg = document.querySelector(".ship-msg");
    if (this.shipsPlaced === 0) msg.textContent = "Place your destroyer";
    if (this.shipsPlaced === 1) msg.textContent = "Place your submarine";
    if (this.shipsPlaced === 2) msg.textContent = "Place your cruiser";
    if (this.shipsPlaced === 3) msg.textContent = "Place your battleship";
    if (this.shipsPlaced === 4) msg.textContent = "Place your carrier";
    if (this.shipsPlaced === 5) msg.textContent = "Your fleet is ready!";
  }

  mouseOut(index) {
    const length = this.player.shipSizes[this.shipsPlaced];
    const axis = this.axis;
    const end = axis === "x" ? index + (length - 1) : index + (length - 1) * 10;

    for (let i = index; i <= end; i += axis === "x" ? 1 : 10) {
      const cellElement = document.querySelector(`[data-index="${i}"]`);
      cellElement.classList.remove("valid-placement");
    }
  }

  showPotentialPlacement(index) {
    const length = this.player.shipSizes[this.shipsPlaced];
    const axis = this.axis;
    const end = axis === "x" ? index + (length - 1) : index + (length - 1) * 10;

    for (let i = index; i <= end; i += axis === "x" ? 1 : 10) {
      const cellElement = document.querySelector(`[data-index="${i}"]`);
      if (this.player.playerBoard.isValidPlacement(index, length, axis)) {
        cellElement.classList.add("valid-placement");
      }
    }
  }

  handlePlacement(index) {
    if (this.shipsPlaced === 5) return;
    const length = this.game.player.shipSizes[this.shipsPlaced];
    const axis = this.axis;
    const end = axis === "x" ? index + (length - 1) : index + (length - 1) * 10;

    // if placement is valid, place ship
    if (this.player.playerBoard.placeShip(index, length, axis)) {
      this.shipsPlaced++;

      for (let i = index; i <= end; i += axis === "x" ? 1 : 10) {
        const cellElement = document.querySelector(`[data-index="${i}"]`);
        cellElement.classList.add("ship");
        cellElement.classList.remove("valid-placement");
      }
    }

    console.log(this.player.playerBoard.ships);
    console.log(this.shipsPlaced);
    this.updateShipMsg();
  }

  startGame() {
    const modal = document.getElementById("place-ships");
    modal.classList.remove("active");
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("active");
    this.init();
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

    console.log("Player board:");
    console.log(this.player.playerBoard);
    console.log("Opponent board");
    console.log(this.opponent.opponentBoard);
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

    const newGameBtn = document.getElementById("new-game-btn");

    newGameBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      overlay.classList.remove("active");
      // create a new game loop and new dom
      this.newGame();
    });
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
