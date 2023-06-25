class DOMInteraction {
  constructor(game, player, opponent) {
    this.game = game;
    this.player = player;
    this.opponent = opponent;
    this.displayWinner = this.displayWinner.bind(this);
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
    const cellIndex = event.target.dataset.index;
    // execute player's turn
    const playerTookTurn = this.game.executePlayerTurn(cellIndex);

    // if player took their turn
    if (playerTookTurn) {
      this.updateBoards();
      this.updateMessage(cellIndex);

      // Check if game is over after player's turn
      if (this.game.isGameOver) {
        console.log(this.game.isGameOver);
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
          console.log("Promise resolved, checking if game is over...");
          console.log(this.game.isGameOver);
          if (this.game.isGameOver) {
            this.displayWinner();
          }
        });
      }
    } else {
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
    console.log("Winner is: ", winner);
    this.displayMessage(`${winner.name} wins!`);
  }

  // Method to initialize the game
  init() {
    this.updateBoards();
    this.displayMessage(`${this.player.name}, take the first shot!`);
  }
}

export default DOMInteraction;
