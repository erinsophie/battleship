/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _init_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./init.js */ \"./src/init.js\");\n\n\nclass DOMInteraction {\n  constructor(game, player, opponent) {\n    this.game = game;\n    this.player = player;\n    this.opponent = opponent;\n    this.shipsPlaced = 0;\n    this.positions = [];\n    this.axis = 'x';\n    this.placeShipsModal();\n  }\n\n  placeShipsModal() {\n    // open modal\n    this.openModal('place-ships-modal');\n    this.generateTempBoard();\n    this.updateShipMsg();\n\n    // add event listener to axis button\n    const axisBtn = document.getElementById('axis-btn');\n    this.axis = 'x';\n    axisBtn.textContent = 'X Axis';\n    axisBtn.addEventListener('click', () => this.changeAxis());\n\n    // add event listener to start game btn\n    const startGameBtn = document.getElementById('start-game-btn');\n    // only start when all 5 ships have been placed\n    startGameBtn.addEventListener('click', () => {\n      if (this.shipsPlaced === 5) this.init();\n    });\n  }\n\n  generateTempBoard() {\n    // clear temp board element\n    const playerBoardElement = document.getElementById('temp-board');\n    playerBoardElement.innerHTML = '';\n\n    // create 100 divs\n    for (let i = 0; i < 100; i++) {\n      const cellElement = document.createElement('div');\n      cellElement.dataset.index = i;\n      cellElement.classList.add('cell');\n\n      // show player potential placement of ship\n      cellElement.addEventListener('mouseover', () =>\n        this.showPotentialPlacement(i)\n      );\n      // remove classes on mouse out\n      cellElement.addEventListener('mouseout', () => this.mouseOut(i));\n\n      // when clicked, place ship here\n      cellElement.addEventListener('click', () => this.handlePlacement(i));\n\n      // append cells to board element\n      playerBoardElement.append(cellElement);\n    }\n  }\n\n  changeAxis() {\n    const axisBtn = document.getElementById('axis-btn');\n\n    if (this.axis === 'x') {\n      this.axis = 'y';\n      axisBtn.textContent = 'Y Axis';\n    } else {\n      this.axis = 'x';\n      axisBtn.textContent = 'X Axis';\n    }\n  }\n\n  updateShipMsg() {\n    const shipMessages = [\n      'Place your destroyer',\n      'Place your submarine',\n      'Place your cruiser',\n      'Place your battleship',\n      'Place your carrier',\n      'Your fleet is ready!',\n    ];\n\n    const msg = document.getElementById('ship-msg');\n    msg.textContent = shipMessages[this.shipsPlaced];\n  }\n\n  getShipProperties(index) {\n    const length = this.player.shipSizes[this.shipsPlaced];\n    const { axis } = this;\n    const end = axis === 'x' ? index + (length - 1) : index + (length - 1) * 10;\n    const step = axis === 'x' ? 1 : 10;\n\n    return { length, axis, end, step };\n  }\n\n  mouseOut(index) {\n    const { end, step } = this.getShipProperties(index);\n\n    for (let i = index; i <= end; i += step) {\n      const cellElement = document.querySelector(`[data-index=\"${i}\"]`);\n      if (cellElement) cellElement.classList.remove('valid-placement');\n    }\n  }\n\n  showPotentialPlacement(index) {\n    const { length, axis, end, step } = this.getShipProperties(index);\n\n    for (let i = index; i <= end; i += step) {\n      const cellElement = document.querySelector(`[data-index=\"${i}\"]`);\n      if (this.player.playerBoard.isValidPlacement(index, length, axis)) {\n        cellElement.classList.add('valid-placement');\n      }\n    }\n  }\n\n  handlePlacement(index) {\n    if (this.shipsPlaced === 5) return;\n    const { length, axis, end, step } = this.getShipProperties(index);\n\n    // if placement is valid, place ship\n    if (this.player.playerBoard.placeShip(index, length, axis)) {\n      this.shipsPlaced++;\n\n      for (let i = index; i <= end; i += step) {\n        const cellElement = document.querySelector(`[data-index=\"${i}\"]`);\n        cellElement.classList.add('ship');\n        cellElement.classList.remove('valid-placement');\n      }\n    }\n\n    this.updateShipMsg();\n  }\n\n  checkIfShipSunk(board) {\n    board.ships.forEach((ship) => {\n      if (ship.isSunk()) {\n        ship.positions.forEach((position) => {\n          const stringPosition = position.toString();\n          const boardId =\n            board === this.player.playerBoard\n              ? 'player-board'\n              : 'opponent-board';\n          const cellElement = document.querySelector(\n            `#${boardId} [data-index=\"${stringPosition}\"]`\n          );\n          if (cellElement) {\n            cellElement.classList.remove('attempted');\n            cellElement.classList.remove('hit');\n            cellElement.classList.remove('ship');\n            cellElement.classList.add('sunk');\n          }\n        });\n      }\n    });\n  }\n\n  renderBoard(board, boardId) {\n    const boardElement = document.getElementById(boardId);\n    boardElement.innerHTML = '';\n\n    board.cells.forEach((cell, index) => {\n      const cellElement = document.createElement('div');\n      cellElement.dataset.index = index;\n      cellElement.classList.add('cell');\n\n      // applies to both boards\n\n      // when a cell is clicked mark with a dot\n      if (cell.attempted) {\n        cellElement.classList.add('attempted');\n        // if it hits a ship\n        if (cell.occupied) cellElement.classList.add('hit');\n        // append cells to board element\n      }\n\n      // if board is the player's board\n      if (this.player.playerBoard === board) {\n        // show player their ships\n        if (cell.occupied) {\n          cellElement.classList.add('ship');\n        }\n      } else {\n        // if its the opponent's board, change hover color\n        !cell.attempted\n          ? cellElement.classList.add('valid')\n          : cellElement.classList.add('invalid');\n        // add event listener for clicks\n        cellElement.addEventListener('click', this.handleCellClick.bind(this));\n      }\n      this.checkIfShipSunk(board);\n      // append cells to board\n      boardElement.appendChild(cellElement);\n    });\n  }\n\n  // update both boards on each turn\n  updateBoards() {\n    this.renderBoard(this.player.playerBoard, 'player-board');\n    this.renderBoard(this.opponent.opponentBoard, 'opponent-board');\n  }\n\n  handleCellClick(event) {\n    // parse index from string to number\n    const cellIndex = parseInt(event.target.dataset.index);\n    // execute player's turn\n    const playerTookTurn = this.game.executePlayerTurn(cellIndex);\n\n    // check if player took their turn\n    if (playerTookTurn) {\n      this.updateBoards();\n      this.updateMessage(cellIndex);\n      // Check if game is over after player's turn\n      if (this.game.isGameOver) {\n        this.displayWinner();\n        // if not, execute computer turn\n      } else {\n        // Wrap the computer's turn inside a Promise\n        new Promise((resolve) => {\n          setTimeout(() => {\n            const computerChosenIndex = this.game.executeComputerTurn();\n            this.updateBoards();\n            this.updateMessage(computerChosenIndex);\n\n            resolve(); // Resolve the promise in 1 second\n          }, 1000);\n        }).then(() => {\n          // Check if game is over after the promise is resolved (computer's turn)\n          if (this.game.isGameOver) {\n            this.displayWinner();\n          }\n        });\n      }\n    } else if (!this.game.isGameOver) {\n      this.displayMessage('You have already fired here!');\n    }\n\n    console.log('Players board:');\n    console.log(this.player.playerBoard);\n    console.log('Opponents board:');\n    console.log(this.opponent.opponentBoard);\n  }\n\n  updateMessage(cellIndex) {\n    const playerMiss = `You fire a shot and...it's a miss!`;\n    const playerHit = `You fire a shot and...it's a hit!`;\n    const opponentMiss = `Enemy fires a shot and...it's a miss!`;\n    const opponentHit = `Enemy fires a shot and...it's a hit!`;\n\n    if (this.game.turn === this.opponent) {\n      const cell = this.opponent.opponentBoard.cells[cellIndex];\n      cell.occupied\n        ? this.displayMessage(playerHit)\n        : this.displayMessage(playerMiss);\n    }\n\n    if (this.game.turn === this.player) {\n      const cell = this.player.playerBoard.cells[cellIndex];\n      cell.occupied\n        ? this.displayMessage(opponentHit)\n        : this.displayMessage(opponentMiss);\n    }\n  }\n\n  // Method to display a message\n  displayMessage(message) {\n    const messageElement = document.getElementById('turns-msg');\n    messageElement.textContent = message;\n  }\n\n  // Method to display the winner\n  displayWinner() {\n    const winner = this.game.returnWinner();\n\n    // activate modal and overlay\n    this.openModal('winner-modal');\n    const message = document.getElementById('winner-name');\n    message.textContent = `${winner.name} wins!`;\n\n    // new game button\n    const newGameBtn = document.getElementById('new-game-btn');\n    newGameBtn.addEventListener('click', () => {\n      this.closeModal('winner-modal');\n      this.newGame();\n    });\n  }\n\n  openModal(modalId) {\n    const modal = document.getElementById(modalId);\n    modal.classList.add('active');\n    const overlay = document.getElementById('overlay');\n    overlay.classList.add('active');\n  }\n\n  closeModal(modalId) {\n    const modal = document.getElementById(modalId);\n    modal.classList.remove('active');\n    const overlay = document.getElementById('overlay');\n    overlay.classList.remove('active');\n  }\n\n  newGame() {\n    // reset old game boards in dom\n    this.resetBoard('player-board');\n    this.resetBoard('opponent-board');\n    // create new game loop and dom\n    (0,_init_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  }\n\n  resetBoard(boardElementId) {\n    const boardElement = document.getElementById(boardElementId);\n    boardElement.innerHTML = '';\n  }\n\n  // Method to initialize the game\n  init() {\n    this.closeModal('place-ships-modal');\n    this.updateBoards();\n    this.displayMessage(`${this.player.name}, take the first shot!`);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOMInteraction);\n\n\n//# sourceURL=webpack://battleship/./src/dom.js?");

/***/ }),

/***/ "./src/gameLoop.js":
/*!*************************!*\
  !*** ./src/gameLoop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n/* harmony import */ var _opponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./opponent.js */ \"./src/opponent.js\");\n\n\n\n\nclass GameLoop {\n  constructor() {\n    const playerBoard = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    const opponentBoard = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.player = new _player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Player', playerBoard, opponentBoard);\n    this.opponent = new _opponent_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('Opponent', opponentBoard, playerBoard);\n    this.isGameOver = false;\n    this.turn = this.player;\n  }\n\n  // check if game is over\n  checkGameOver() {\n    if (\n      this.player.playerBoard.allShipsSunk() ||\n      this.opponent.opponentBoard.allShipsSunk()\n    ) {\n      this.isGameOver = true;\n    }\n  }\n\n  // execute player attack\n  executePlayerTurn(index) {\n    // if game is over or if it's still opponent's, prevent attack\n    if (this.isGameOver || this.turn === this.opponent) return;\n\n    // attack only happens if cell has not been attacked before\n    const isValidMove = this.player.playTurn(index);\n\n    if (isValidMove) {\n      this.checkGameOver();\n      this.turn = this.opponent;\n      return true;\n    }\n    return false;\n  }\n\n  executeComputerTurn() {\n    const index = this.opponent.playTurn();\n    this.checkGameOver();\n    this.turn = this.player;\n    return index;\n  }\n\n  returnWinner() {\n    return this.player.playerBoard.allShipsSunk() ? this.opponent : this.player;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameLoop);\n\n\n//# sourceURL=webpack://battleship/./src/gameLoop.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n\n\nclass Gameboard {\n  constructor() {\n    this.cells = [];\n    this.ships = [];\n    this.misses = [];\n    this.init();\n  }\n\n  // initialise board with 100 cells\n  init() {\n    for (let i = 0; i < 100; i++) {\n      this.cells.push({\n        occupied: false,\n        attempted: false,\n        markAsOccupied() {\n          this.occupied = true;\n        },\n        markAsAttempted() {\n          this.attempted = true;\n        },\n      });\n    }\n  }\n\n  // checks whether the position player wants to place ship fits in those cells and is not already occupied\n  isValidPlacement(start, length, axis) {\n    return (\n      this.fitsInCells(start, length, axis) &&\n      this.isUnoccupied(start, length, axis)\n    );\n  }\n\n  fitsInCells(start, length, axis) {\n    // e.g 27 would be row 2, col 7 in (0-indexed)\n    const startRow = Math.floor(start / 10);\n    const startCol = start % 10;\n\n    // check if move does not go off the board\n    if (axis === 'x') {\n      if (startCol + length - 1 <= 9) return true;\n    }\n\n    if (axis === 'y') {\n      if (startRow + length - 1 <= 9) return true;\n    }\n\n    return false;\n  }\n\n  isUnoccupied(start, length, axis) {\n    const end = axis === 'x' ? start + (length - 1) : start + (length - 1) * 10;\n\n    if (axis === 'x') {\n      for (let i = start; i <= end; i++) {\n        if (this.cells[i].occupied) return false;\n      }\n    }\n\n    if (axis === 'y') {\n      for (let i = start; i <= end; i += 10) {\n        if (this.cells[i].occupied) return false;\n      }\n    }\n\n    return true;\n  }\n\n  placeShip(start, length, axis) {\n    if (this.isValidPlacement(start, length, axis)) {\n      const positions = [];\n      const end =\n        axis === 'x' ? start + (length - 1) : start + (length - 1) * 10;\n\n      // mark those cells as occupied\n      // push each position into positions array\n      for (let i = start; i <= end; i += axis === 'x' ? 1 : 10) {\n        this.cells[i].markAsOccupied();\n        positions.push(i);\n      }\n\n      // create a new ship with those positions\n      const newShip = new _ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](positions);\n      // push new ship object into ships array\n      this.ships.push(newShip);\n      return true;\n    }\n  }\n\n  attack(index) {\n    // mark cell as attempted\n    this.cells[index].markAsAttempted();\n\n    // check if the cell that was hit is occupied\n    if (this.cells[index].occupied) {\n      // find which ship it belongs to\n      let shipThatWasHit;\n\n      this.ships.forEach((ship) => {\n        if (ship.positions.includes(index)) shipThatWasHit = ship;\n      });\n\n      // call hit method on that cell to push that index into its hits array\n      shipThatWasHit.hit(index);\n    } else {\n      // if the cell is not occupied, add it to the misses array\n      this.misses.push(index);\n    }\n  }\n\n  allShipsSunk() {\n    return this.ships.every((ship) => ship.isSunk());\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _init_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./init.js */ \"./src/init.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', _init_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/init.js":
/*!*********************!*\
  !*** ./src/init.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameLoop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameLoop.js */ \"./src/gameLoop.js\");\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n\n\n\nfunction initGame() {\n  const game = new _gameLoop_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  const domInteraction = new _dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](game, game.player, game.opponent);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initGame);\n\n\n//# sourceURL=webpack://battleship/./src/init.js?");

/***/ }),

/***/ "./src/opponent.js":
/*!*************************!*\
  !*** ./src/opponent.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// represents the opponent's board\nclass Opponent {\n  constructor(name, opponentBoard, playerBoard) {\n    this.name = name;\n    this.opponentBoard = opponentBoard;\n    this.playerBoard = playerBoard;\n    this.shipSizes = [2, 3, 3, 4, 5];\n    this.initBoard();\n  }\n\n  // opponent's board is set up with 5 ships placed in random legal cells\n  initBoard() {\n    // safe gaurd in case computer keeps generating invalid indices to cap at 1000 attempts\n    let attemptCounter = 0;\n\n    while (this.opponentBoard.ships.length < 5 && attemptCounter < 1000) {\n      const startIndex = this.generateRandomIndex();\n      const length = this.shipSizes[this.opponentBoard.ships.length];\n      const axis = Math.random() < 0.5 ? 'x' : 'y';\n\n      this.opponentBoard.placeShip(startIndex, length, axis);\n      attemptCounter++;\n    }\n    if (attemptCounter === 1000) {\n      console.log('Could not find legal placement for all ships.');\n    }\n  }\n\n  generateRandomIndex() {\n    return Math.floor(Math.random() * this.opponentBoard.cells.length);\n  }\n\n  // computer takes random shot at player's board\n  playTurn() {\n    let index;\n    do {\n      // keep generating index if index generated was already attempted\n      index = this.generateRandomIndex();\n    } while (this.playerBoard.cells[index].attempted);\n\n    this.playerBoard.attack(index);\n    return index;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Opponent);\n\n\n//# sourceURL=webpack://battleship/./src/opponent.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Player {\n  constructor(name, playerBoard, opponentBoard) {\n    this.name = name;\n    this.playerBoard = playerBoard;\n    this.opponentBoard = opponentBoard;\n    this.shipSizes = [2, 3, 3, 4, 5];\n  }\n\n  // player takes their shot at opponent's board\n  playTurn(index) {\n    // if the cell the player is attempting to attack has already been attacked\n    // return false indicating that the player's turn did not execute\n    if (this.opponentBoard.cells[index].attempted) {\n      console.log(`Cell ${index} has already been attacked`);\n      return false;\n    }\n    this.opponentBoard.attack(index);\n    // return true to indicate that the player took their turn\n    return true;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Ship {\n  constructor(positions) {\n    this.positions = positions;\n    this.length = positions.length;\n    this.hits = [];\n  }\n\n  hit(position) {\n    if (this.hits.includes(position)) return;\n    this.hits.push(position);\n  }\n\n  isSunk() {\n    return this.hits.length === this.length;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;