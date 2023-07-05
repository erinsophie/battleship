import initGame from './init.js';

class DOMInteraction {
  constructor(game, player, opponent) {
    this.game = game;
    this.player = player;
    this.opponent = opponent;
    this.shipsPlaced = 0;
    this.positions = [];
    this.axis = 'x';
    this.placeShipsModal();
  }

  placeShipsModal() {
    // open modal
    this.openModal('.place-ships-modal');
    this.generateTempBoard();
    this.updateShipMsg();

    // add event listener to axis button
    const axisBtn = document.querySelector('.axis-btn');
    this.axis = 'x';
    axisBtn.textContent = 'X Axis';
    axisBtn.addEventListener('click', () => this.changeAxis());

    // add event listener to start game btn
    const startGameBtn = document.querySelector('.start-game-btn');
    // only start when all 5 ships have been placed
    startGameBtn.addEventListener('click', () => {
      if (this.shipsPlaced === 5) this.init();
    });
  }

  generateTempBoard() {
    // clear temp board element
    const playerBoardElement = document.querySelector('.temp-board');
    playerBoardElement.innerHTML = '';

    // create 100 divs
    for (let i = 0; i < 100; i++) {
      const cellElement = document.createElement('div');
      cellElement.dataset.index = i;
      cellElement.classList.add('cell');

      // show player potential placement of ship
      cellElement.addEventListener('mouseover', () =>
        this.showPotentialPlacement(i)
      );
      // remove classes on mouse out
      cellElement.addEventListener('mouseout', () => this.mouseOut(i));

      // when clicked, place ship here
      cellElement.addEventListener('click', () => this.handlePlacement(i));

      // append cells to board element
      playerBoardElement.append(cellElement);
    }
  }

  changeAxis() {
    const axisBtn = document.querySelector('.axis-btn');

    if (this.axis === 'x') {
      this.axis = 'y';
      axisBtn.textContent = 'Y Axis';
    } else {
      this.axis = 'x';
      axisBtn.textContent = 'X Axis';
    }
  }

  updateShipMsg() {
    const shipMessages = [
      'Place your destroyer',
      'Place your submarine',
      'Place your cruiser',
      'Place your battleship',
      'Place your carrier',
      'Your fleet is ready!',
    ];

    const msg = document.querySelector('.ship-msg');
    msg.textContent = shipMessages[this.shipsPlaced];
  }

  getShipProperties(index) {
    const length = this.player.shipSizes[this.shipsPlaced];
    const { axis } = this;
    const end = axis === 'x' ? index + (length - 1) : index + (length - 1) * 10;
    const step = axis === 'x' ? 1 : 10;

    return { length, axis, end, step };
  }

  mouseOut(index) {
    const { end, step } = this.getShipProperties(index);

    for (let i = index; i <= end; i += step) {
      const cellElement = document.querySelector(`[data-index="${i}"]`);
      if (cellElement) cellElement.classList.remove('valid-placement');
    }
  }

  showPotentialPlacement(index) {
    const { length, axis, end, step } = this.getShipProperties(index);

    for (let i = index; i <= end; i += step) {
      const cellElement = document.querySelector(`[data-index="${i}"]`);
      if (this.player.playerBoard.isValidPlacement(index, length, axis)) {
        cellElement.classList.add('valid-placement');
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
        cellElement.classList.add('ship');
        cellElement.classList.remove('valid-placement');
      }
    }

    this.updateShipMsg();
  }

  checkIfShipSunk(board) {
    board.ships.forEach((ship) => {
      if (ship.isSunk()) {
        ship.positions.forEach((position) => {
          const stringPosition = position.toString();
          const boardElement =
            board === this.player.playerBoard
              ? '.player-board'
              : '.opponent-board';
          const cellElement = document.querySelector(
            `${boardElement} [data-index="${stringPosition}"]`
          );
          if (cellElement) {
            cellElement.classList.remove('attempted');
            cellElement.classList.remove('hit');
            cellElement.classList.remove('ship');
            cellElement.classList.add('sunk');
          }
        });
      }
    });
  }

  renderBoard(board, className) {
    const boardElement = document.querySelector(className);
    boardElement.innerHTML = '';

    board.cells.forEach((cell, index) => {
      const cellElement = document.createElement('div');
      cellElement.dataset.index = index;
      cellElement.classList.add('cell');

      // applies to both boards

      // when a cell is clicked mark with a dot
      if (cell.attempted) {
        cellElement.classList.add('attempted');
        // if it hits a ship
        if (cell.occupied) cellElement.classList.add('hit');
        // append cells to board element
      }

      // if board is the player's board
      if (this.player.playerBoard === board) {
        // show player their ships
        if (cell.occupied) {
          cellElement.classList.add('ship');
        }
      } else {
        // if its the opponent's board, change hover color
        !cell.attempted
          ? cellElement.classList.add('valid')
          : cellElement.classList.add('invalid');
        // add event listener for clicks
        cellElement.addEventListener('click', this.handleCellClick.bind(this));
      }
      this.checkIfShipSunk(board);
      // append cells to board
      boardElement.appendChild(cellElement);
    });
  }

  // update both boards on each turn
  updateBoards() {
    this.renderBoard(this.player.playerBoard, '.player-board');
    this.renderBoard(this.opponent.opponentBoard, '.opponent-board');
  }

  handleCellClick(event) {
    // parse index from string to number
    const cellIndex = parseInt(event.target.dataset.index);
    // execute player's turn
    const playerTookTurn = this.game.executePlayerTurn(cellIndex);

    // check if player took their turn
    if (playerTookTurn) {
      this.updateBoards();
      this.updateMessage(cellIndex);
      // Check if game is over after player's turn
      if (this.game.isGameOver) {
        this.displayWinner();
        // if not, execute computer turn
      } else {
        // Wrap the computer's turn inside a Promise
        new Promise((resolve) => {
          setTimeout(() => {
            const computerChosenIndex = this.game.executeComputerTurn();
            this.updateBoards();
            this.updateMessage(computerChosenIndex);

            resolve(); // Resolve the promise in 1 second
          }, 1000);
        }).then(() => {
          // Check if game is over after the promise is resolved (computer's turn)
          if (this.game.isGameOver) {
            this.displayWinner();
          }
        });
      }
    } else if (!this.game.isGameOver) {
      this.displayMessage('You have already fired here!');
    }

    console.log('Players board:');
    console.log(this.player.playerBoard);
    console.log('Opponents board:');
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
    const messageElement = document.querySelector('.turns-msg');
    messageElement.textContent = message;
  }

  // Method to display the winner
  displayWinner() {
    const winner = this.game.returnWinner();

    // activate modal and overlay
    this.openModal('.winner-modal');
    const message = document.querySelector('.winner-name');
    message.textContent = `${winner.name} wins!`;

    // new game button
    const newGameBtn = document.querySelector('.new-game-btn');
    newGameBtn.addEventListener('click', () => {
      this.closeModal('.winner-modal');
      this.newGame();
    });
  }

  openModal(modalElement) {
    const modal = document.querySelector(modalElement);
    modal.classList.add('active');
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('active');
  }

  closeModal(modalElement) {
    const modal = document.querySelector(modalElement);
    modal.classList.remove('active');
    const overlay = document.querySelector('.overlay');
    overlay.classList.remove('active');
  }

  newGame() {
    // reset old game boards in dom
    this.resetBoard('.player-board');
    this.resetBoard('.opponent-board');
    // create new game loop and dom
    initGame();
  }

  resetBoard(boardElement) {
    const board = document.querySelector(boardElement);
    board.innerHTML = '';
  }

  // Method to initialize the game
  init() {
    this.closeModal('.place-ships-modal');
    this.updateBoards();
    this.displayMessage(`${this.player.name}, take the first shot!`);
  }
}

export default DOMInteraction;
