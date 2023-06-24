// Render the gameboards on the webpage.
// Take user input for attacking (click on a coordinate on the enemy Gameboard).

class DOMInteraction {
  constructor(game, player, opponent) {
    this.game = game;
    this.player = player;
    this.opponent = opponent;
  }

  // render computer board
  renderOpponentBoard(board) {
    const boardElement = document.getElementById("opponent-board");

    // Clear previous state
    boardElement.innerHTML = "";

    // Render new state
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
    // Clear previous state
    boardElement.innerHTML = "";

    // Render new state
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

  // update the both boards on each turn
  updateBoards() {
    this.renderPlayerBoard(this.player.playerBoard);
    this.renderOpponentBoard(this.opponent.opponentBoard);
  }

  handleCellClick(event) {
    const cellIndex = event.target.dataset.index;
    // when a cell is clicked, execute player turn
    // if player took their turn, then update both boards
    // wait 1 second and then execute the computers attack
    const playerTookTurn = this.game.executePlayerTurn(cellIndex);

    if (playerTookTurn) {
      this.updateBoards();
      // Delay computer's turn by 2 seconds
      setTimeout(() => {
        this.game.executeComputerTurn();
        this.updateBoards();
        if (this.game.isGameOver) {
          this.displayWinner();
        }
      }, 1000);
    } else {
      this.displayMessage("You have already fired here!");
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
    this.displayMessage(`${winner.name} wins!`);
  }

  // Method to initialize the game
  init() {
    this.updateBoards();
    this.displayMessage();
  }
}

export default DOMInteraction;
