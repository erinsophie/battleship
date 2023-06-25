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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass DOMInteraction {\n  constructor(game, player, opponent) {\n    this.game = game;\n    this.player = player;\n    this.opponent = opponent;\n    this.displayWinner = this.displayWinner.bind(this);\n  }\n\n  // render computer board\n  renderOpponentBoard(board) {\n    const boardElement = document.getElementById(\"opponent-board\");\n    boardElement.innerHTML = \"\";\n\n    board.cells.forEach((cell, index) => {\n      // Create a new div for each cell object\n      let cellElement = document.createElement(\"div\");\n      cellElement.dataset.index = index;\n      cellElement.classList.add(\"cell\");\n\n      // change hover color based on if it's a valid place to take a shot\n      !cell.attempted\n        ? cellElement.classList.add(\"valid\")\n        : cellElement.classList.add(\"invalid\");\n\n      // when a cell is clicked mark with a dot\n      if (cell.attempted) {\n        cellElement.classList.add(\"attempted\");\n        // if it hits a ship\n        if (cell.occupied) cellElement.classList.add(\"hit\");\n      }\n\n      // add event listener to each cell\n      cellElement.addEventListener(\"click\", this.handleCellClick.bind(this));\n      boardElement.appendChild(cellElement);\n    });\n  }\n\n  // render player board\n  renderPlayerBoard(board) {\n    const boardElement = document.getElementById(\"player-board\");\n    boardElement.innerHTML = \"\";\n\n    board.cells.forEach((cell, index) => {\n      // Create a new div for each cell object\n      let cellElement = document.createElement(\"div\");\n      cellElement.dataset.index = index;\n      cellElement.classList.add(\"cell\");\n\n      // show player their ships\n      if (cell.occupied) cellElement.classList.add(\"ship\");\n\n      if (cell.attempted) {\n        cellElement.classList.add(\"attempted\");\n        // if it hits a ship\n        if (cell.occupied) cellElement.classList.add(\"hit\");\n      }\n\n      boardElement.appendChild(cellElement);\n    });\n  }\n\n  // update both boards on each turn\n  updateBoards() {\n    this.renderPlayerBoard(this.player.playerBoard);\n    this.renderOpponentBoard(this.opponent.opponentBoard);\n  }\n\n  handleCellClick(event) {\n    const cellIndex = event.target.dataset.index;\n    // execute player's turn\n    const playerTookTurn = this.game.executePlayerTurn(cellIndex);\n\n    // if player took their turn\n    if (playerTookTurn) {\n      this.updateBoards();\n      this.updateMessage(cellIndex);\n\n      // Check if game is over after player's turn\n      if (this.game.isGameOver) {\n        console.log(this.game.isGameOver);\n        this.displayWinner();\n      } else {\n        // Wrap the computer's turn inside a Promise\n        new Promise((resolve) => {\n          setTimeout(() => {\n            const computerChosenIndex = this.game.executeComputerTurn();\n            this.updateBoards();\n            this.updateMessage(computerChosenIndex);\n\n            resolve(); // Resolve the promise\n          }, 1000);\n        }).then(() => {\n          // Check if game is over after the promise is resolved (computer's turn)\n          console.log(\"Promise resolved, checking if game is over...\");\n          console.log(this.game.isGameOver);\n          if (this.game.isGameOver) {\n            this.displayWinner();\n          }\n        });\n      }\n    } else {\n      this.displayMessage(\"You have already fired here!\");\n    }\n  }\n\n  updateMessage(cellIndex) {\n    const playerMiss = `You fire a shot and...it's a miss!`;\n    const playerHit = `You fire a shot and...it's a hit!`;\n    const opponentMiss = `Enemy fires a shot and...it's a miss!`;\n    const opponentHit = `Enemy fires a shot and...it's a hit!`;\n\n    if (this.game.turn === this.opponent) {\n      const cell = this.opponent.opponentBoard.cells[cellIndex];\n      cell.occupied\n        ? this.displayMessage(playerHit)\n        : this.displayMessage(playerMiss);\n    }\n\n    if (this.game.turn === this.player) {\n      const cell = this.player.playerBoard.cells[cellIndex];\n      cell.occupied\n        ? this.displayMessage(opponentHit)\n        : this.displayMessage(opponentMiss);\n    }\n  }\n\n  // Method to display a message\n  displayMessage(message) {\n    const messageElement = document.getElementById(\"message\");\n    messageElement.textContent = message;\n  }\n\n  // Method to display the winner\n  displayWinner() {\n    const winner = this.game.returnWinner();\n    console.log(\"Winner is: \", winner);\n    this.displayMessage(`${winner.name} wins!`);\n  }\n\n  // Method to initialize the game\n  init() {\n    this.updateBoards();\n    this.displayMessage(`${this.player.name}, take the first shot!`);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOMInteraction);\n\n\n//# sourceURL=webpack://battleship/./src/dom.js?");

/***/ }),

/***/ "./src/gameLoop.js":
/*!*************************!*\
  !*** ./src/gameLoop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass GameLoop {\n  constructor(player, opponent) {\n    // so we know the status of each game board\n    this.player = player;\n    this.opponent = opponent;\n    this.isGameOver = false;\n    this.turn = this.player;\n  }\n\n  // check if game is over\n  checkGameOver() {\n    if (\n      this.player.playerBoard.allShipsSunk() ||\n      this.opponent.opponentBoard.allShipsSunk()\n    ) {\n      this.isGameOver = true;\n    }\n  }\n\n  // execute player attack\n  executePlayerTurn(index) {\n    console.log(`Player's attack at index: ${index}`)\n    const isValidMove = this.player.playTurn(index);\n\n    console.log(\"Opponent ships that have been hit:\");\n    this.opponent.opponentBoard.ships.forEach((ship) => {\n      console.log(ship.hits);\n    });\n\n    if (isValidMove) {\n      this.checkGameOver();\n      this.turn = this.opponent;\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  executeComputerTurn() {\n    const index = this.opponent.playTurn();\n\n    console.log(\"Player ships that have been hit:\");\n    this.player.playerBoard.ships.forEach((ship) => {\n      console.log(ship.hits);\n    });\n\n    this.checkGameOver();\n    this.turn = this.player;\n    return index;\n  }\n\n  returnWinner() {\n    const winner = this.player.playerBoard.allShipsSunk()\n      ? this.opponent\n      : this.player;\n    return winner;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameLoop);\n\n\n//# sourceURL=webpack://battleship/./src/gameLoop.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n\n\nclass Gameboard {\n  constructor() {\n    this.cells = [];\n    this.ships = [];\n    this.misses = [];\n    this.init();\n  }\n\n  // initialise board with 100 cells\n  init() {\n    for (let i = 0; i < 100; i++) {\n      this.cells.push({\n        occupied: false,\n        attempted: false,\n        markAsOccupied() {\n          this.occupied = true;\n        },\n        markAsAttempted() {\n          this.attempted = true;\n        },\n      });\n    }\n  }\n\n  // checks whether the position player wants to place ship fits in those cells and is not already occupied\n  isValidPlacement(start, length, axis) {\n    return (\n      this.fitsInCells(start, length, axis) &&\n      this.isUnoccupied(start, length, axis)\n    );\n  }\n\n  fitsInCells(start, length, axis) {\n    // e.g 27 would be row 2, col 7 in (0-indexed)\n    const startRow = Math.floor(start / 10);\n    const startCol = start % 10;\n\n    // check if move does not go off the board\n    if (axis === \"x\") {\n      if (startCol + length - 1 <= 9) return true;\n    }\n\n    if (axis === \"y\") {\n      if (startRow + length - 1 <= 9) return true;\n    }\n\n    return false;\n  }\n\n  isUnoccupied(start, length, axis) {\n    const end = axis === \"x\" ? start + (length - 1) : start + (length - 1) * 10;\n\n    if (axis === \"x\") {\n      for (let i = start; i <= end; i++) {\n        if (this.cells[i].occupied) return false;\n      }\n    }\n\n    if (axis === \"y\") {\n      for (let i = start; i <= end; i += 10) {\n        if (this.cells[i].occupied) return false;\n      }\n    }\n\n    return true;\n  }\n\n  placeShip(start, length, axis) {\n    if (this.isValidPlacement(start, length, axis)) {\n      const positions = [];\n      const end =\n        axis === \"x\" ? start + (length - 1) : start + (length - 1) * 10;\n\n      // mark those cells as occupied\n      // push each position into positions array\n      for (let i = start; i <= end; i += axis === \"x\" ? 1 : 10) {\n        this.cells[i].markAsOccupied();\n        positions.push(i);\n      }\n\n      // create a new ship with those positions\n      const newShip = new _ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](positions);\n      // push new ship object into ships array\n      this.ships.push(newShip);\n    }\n  }\n\n  attack(position) {\n    const index = parseInt(position);\n    // mark cell as attempted\n    this.cells[index].markAsAttempted();\n\n    // check if the cell that was hit is occupied\n    if (this.cells[index].occupied) {\n      // find which ship it belongs to\n      let shipThatWasHit;\n\n      this.ships.forEach((ship) => {\n        if (ship.positions.includes(index)) shipThatWasHit = ship;\n      });\n\n      console.log(\"ship that was hit\");\n      console.log(shipThatWasHit);\n\n      // if it is, call hit method on that cell to push that index into its hits array\n      shipThatWasHit.hit(index);\n    } else {\n      // if the cell is not occupied, add it to the misses array\n      this.misses.push(index);\n      console.log(\"Misses:\");\n      console.log(this.misses);\n    }\n  }\n\n  allShipsSunk() {\n    if (this.ships.every((ship) => ship.isSunk())) {\n      return true;\n    } else {\n      return false;\n    }\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n/* harmony import */ var _opponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./opponent.js */ \"./src/opponent.js\");\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\");\n/* harmony import */ var _gameLoop_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameLoop.js */ \"./src/gameLoop.js\");\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n\n\n\n\n\n\n// Initialize player's and opponent's gameboards\nconst playerBoard = new _gameboard_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\nconst opponentBoard = new _gameboard_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n\n// Place the player's ships\nplayerBoard.placeShip(0, 5, \"x\");\nplayerBoard.placeShip(17, 4, \"y\");\nplayerBoard.placeShip(32, 3, \"x\");\nplayerBoard.placeShip(55, 3, \"y\");\nplayerBoard.placeShip(61, 2, \"x\");\n\n// Initialize player and opponent\nconst player = new _player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"Player\", playerBoard, opponentBoard);\nconst opponent = new _opponent_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"Opponent\", opponentBoard, playerBoard);\n\n// Initialize the game\nconst game = new _gameLoop_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](player, opponent);\n\n// Initialize the DOM Interaction module\nconst domInteraction = new _dom_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](game, player, opponent);\n\n// Start the game\ndomInteraction.init();\n\nconsole.log(game.opponent.opponentBoard.ships)\n\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/opponent.js":
/*!*************************!*\
  !*** ./src/opponent.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// represents the opponent's board\nclass Opponent {\n  constructor(name, opponentBoard, playerBoard) {\n    this.name = name;\n    this.opponentBoard = opponentBoard;\n    this.playerBoard = playerBoard;\n    this.shipSizes = [2, 3, 3, 4, 5];\n    this.initBoard();\n  }\n\n  // opponent's board is set up with 5 ships placed in random legal cells\n  initBoard() {\n    // safe gaurd in case computer keeps generating invalid indices to cap at 1000 attempts\n    let attemptCounter = 0;\n\n    while (this.opponentBoard.ships.length < 5 && attemptCounter < 1000) {\n      const startIndex = this.generateRandomIndex();\n      const length = this.shipSizes[this.opponentBoard.ships.length];\n      const axis = Math.random() < 0.5 ? \"x\" : \"y\";\n\n      this.opponentBoard.placeShip(startIndex, length, axis);\n      attemptCounter++;\n    }\n    if (attemptCounter === 1000) {\n      console.log(\"Could not find legal placement for all ships.\");\n    }\n  }\n\n  generateRandomIndex() {\n    return Math.floor(Math.random() * this.opponentBoard.cells.length);\n  }\n\n  // computer takes random shot at player's board\n  playTurn() {\n    let index;\n    do {\n      // keep generating index if index generated was already attempted\n      index = this.generateRandomIndex();\n    } while (this.playerBoard.cells[index].attempted);\n\n    this.playerBoard.attack(index);\n    return index;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Opponent);\n\n\n//# sourceURL=webpack://battleship/./src/opponent.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// represents the player's board and their functionality\nclass Player {\n  constructor(name, playerBoard, opponentBoard) {\n    this.name = name;\n    this.playerBoard = playerBoard;\n    this.opponentBoard = opponentBoard;\n  }\n\n  // let player place 5 ships\n  placePlayerShip(start, length, axis) {\n    if (this.playerBoard.ships.length < 5) {\n      this.playerBoard.placeShip(start, length, axis);\n    }\n  }\n\n  // player takes their shot at opponent's board\n  playTurn(index) {\n    // if the cell the player is attempting to attack has already been attacked\n    // return false indicating that the player's turn did not execute\n    if (this.opponentBoard.cells[index].attempted) {\n      console.log(`Cell ${index} has already been attacked`);\n      return false;\n    }\n    this.opponentBoard.attack(index);\n    // return true to indicate that the player took their turn\n    return true;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

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