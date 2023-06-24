// Render the gameboards on the webpage.
// Take user input for attacking (click on a coordinate on the enemy Gameboard).

class DOMInteraction {
  constructor(game, player, opponent) {
    this.game = game;
    this.player = player;
    this.opponent = opponent;
  }

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

      // if cell was attempted and hits a ship
      if (cell.attempted && cell.occupied) cellElement.classList.add("hit");

      // if cell was attempted but is not occupied
      if (cell.attempted && !cell.occupied)
        cellElement.classList.add("attempted");

      // add event listener to each cell
      cellElement.addEventListener("click", this.handleCellClick.bind(this));
      boardElement.appendChild(cellElement);
    });
  }

  // Method to render the game board
  renderPlayerBoard(board) {
    const boardElement = document.getElementById("player-board");
    const playerShips = board.ships;
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

      // if cell was attempted and hits a ship
      if (cell.attempted && cell.occupied) cellElement.classList.add("hit");

      // if cell was attempted but is not occupied
      if (cell.attempted && !cell.occupied)
        cellElement.classList.add("attempted");

      boardElement.appendChild(cellElement);
    });
  }

  // Method to update the game boards each turn
  updateBoards() {
    this.renderPlayerBoard(this.player.playerBoard);
    this.renderOpponentBoard(this.opponent.opponentBoard);
  }

  // Method to handle cell clicks
  handleCellClick(event) {
    const cellIndex = event.target.dataset.index;
    this.player.playTurn(cellIndex);
    this.updateBoards();
  }

  // Method to display a message
  displayMessage() {
    const messageElement = document.getElementById("message");
    let message;

    if (this.game.turn === this.player) {
      message = `${this.player.name} take your shot!`;
    } else {
      message = "The enemy is firing!";
    }

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
