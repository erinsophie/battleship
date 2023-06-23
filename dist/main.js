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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Game {\n  constructor(player, opponent, ui) {\n    // so we know the status of each game board\n    this.player = player;\n    this.opponent = opponent;\n    this.turn = this.player;\n    this.isGameOver = false;\n    this.ui = ui;\n  }\n\n  // check if game is over\n  checkGameOver() {\n    if (\n      this.player.playerBoard.allShipsSunk() ||\n      this.opponent.opponentBoard.allShipsSunk()\n    ) {\n      this.isGameOver = true;\n      this.displayWinner();\n    }\n  }\n\n  // taking turns\n  // Controller handles the interaction\n  switchTurn(index) {\n    if (this.turn === this.player) {\n      this.player.playTurn(index);\n      this.turn = this.opponent;\n    } else if (this.turn === this.opponent) {\n      this.opponent.playTurn();\n      this.turn = this.player;\n    }\n    this.checkGameOver();\n    this.ui.updateBoards(this.player, this.opponent);\n  }\n\n  returnWinner() {\n    let winner = this.player.playerBoard.allShipsSunk() ? opponent : player;\n    return winner;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n\n\nclass Gameboard {\n  constructor() {\n    this.cells = [];\n    this.ships = [];\n    this.misses = [];\n    this.init();\n  }\n\n  // initialise board with 100 cells\n  init() {\n    for (let i = 0; i < 100; i++) {\n      this.cells.push({\n        occupied: false,\n        attempted: false,\n        markAsOccupied() {\n          this.occupied = true;\n        },\n        markAsAttempted() {\n          this.attempted = true;\n        },\n      });\n    }\n  }\n\n  // checks whether the position player wants to place ship fits in those cells and is not already occupied\n  isValidPlacement(start, length, axis) {\n    return (\n      this.fitsInCells(start, length, axis) &&\n      this.isUnoccupied(start, length, axis)\n    );\n  }\n\n  fitsInCells(start, length, axis) {\n    // e.g 27 would be row 2, col 7 in (0-indexed)\n    const startRow = Math.floor(start / 10);\n    const startCol = start % 10;\n\n    // check if move does not go off the board\n    if (axis === \"x\") {\n      if (startCol + length - 1 <= 9) return true;\n    }\n\n    if (axis === \"y\") {\n      if (startRow + length - 1 <= 9) return true;\n    }\n\n    return false;\n  }\n\n  isUnoccupied(start, length, axis) {\n    const end = axis === \"x\" ? start + (length - 1) : start + (length - 1) * 10;\n\n    if (axis === \"x\") {\n      for (let i = start; i <= end; i++) {\n        if (this.cells[i].occupied) return false;\n      }\n    }\n\n    if (axis === \"y\") {\n      for (let i = start; i <= end; i += 10) {\n        if (this.cells[i].occupied) return false;\n      }\n    }\n\n    return true;\n  }\n\n  placeShip(start, length, axis) {\n    if (this.isValidPlacement(start, length, axis)) {\n      const positions = [];\n      const end =\n        axis === \"x\" ? start + (length - 1) : start + (length - 1) * 10;\n\n      // mark those cells as occupied\n      // push each position into positions array\n      for (let i = start; i <= end; i += axis === \"x\" ? 1 : 10) {\n        this.cells[i].markAsOccupied();\n        positions.push(i);\n      }\n\n      // create a new ship with those positions\n      const newShip = new _ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](positions);\n      // push new ship object into ships array\n      this.ships.push(newShip);\n    }\n  }\n\n  attack(index) {\n    // marks cell as attempted\n    this.cells[index].markAsAttempted();\n\n    // if cell contains a ship, call hit on that ship\n    if (this.cells[index].occupied) {\n      const hitShip = this.ships.find((ship) => ship.positions.includes(index));\n      if (hitShip && !hitShip.hits.includes(index)) {\n        hitShip.hit(index);\n      }\n    } else {\n      // if the cell is not occupied, add it to the misses array\n      this.misses.push(index);\n    }\n  }\n\n  allShipsSunk() {\n    return this.ships.every((ship) => ship.isSunk());\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n/* harmony import */ var _opponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./opponent.js */ \"./src/opponent.js\");\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui.js */ \"./src/ui.js\");\n\n\n\n\n\n\n\nconst player = new _player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"Player\", new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](), new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]());\nconst opponent = new _opponent_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"Opponent\", new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](), new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]());\n\n// manually inserting player ships\nplayer.placePlayerShip(10, 3, \"x\");\nplayer.placePlayerShip(67, 2, \"x\");\nplayer.placePlayerShip(20, 5, \"y\");\nplayer.placePlayerShip(85, 4, \"x\");\nplayer.placePlayerShip(90, 3, \"x\");\n\nconst ui = new _ui_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](player, opponent); // View\nconst game = new _game_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](player, opponent, ui); // Controller\n\n// Now the ships have been placed before creating UI\n// and the game is created after the UI\ngame.ui.updateBoards(player, opponent); // Use player and opponent variables directly\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/opponent.js":
/*!*************************!*\
  !*** ./src/opponent.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// represents the opponent's board\nclass Opponent {\n  constructor(name, opponentBoard, playerBoard) {\n    this.name = name;\n    this.opponentBoard = opponentBoard;\n    this.playerBoard = playerBoard;\n    this.shipSizes = [2, 3, 3, 4, 5];\n    this.initBoard();\n  }\n\n  // opponent's board is set up with 5 ships placed in random legal cells\n  initBoard() {\n    // safe gaurd in case computer keeps generating invalid indices to cap at 1000 attempts\n    let attemptCounter = 0;\n\n    while (this.opponentBoard.ships.length < 5 && attemptCounter < 1000) {\n      const startIndex = this.generateRandomIndex();\n      const length = this.shipSizes[this.opponentBoard.ships.length];\n      const axis = Math.random() < 0.5 ? \"x\" : \"y\";\n\n      this.opponentBoard.placeShip(startIndex, length, axis);\n      attemptCounter++;\n    }\n    if (attemptCounter === 1000) {\n      console.log(\"Could not find legal placement for all ships.\");\n    }\n  }\n\n  generateRandomIndex() {\n    return Math.floor(Math.random() * this.opponentBoard.cells.length);\n  }\n\n  // computer takes random shot at player's board\n  playTurn() {\n    let index;\n    do {\n      // keep generating index if index generated was already attempted\n      index = this.generateRandomIndex();\n    } while (this.playerBoard.cells[index].attempted);\n\n    this.playerBoard.attack(index);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Opponent);\n\n\n//# sourceURL=webpack://battleship/./src/opponent.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// represents the player's board and their functionality\nclass Player {\n  constructor(name, playerBoard, opponentBoard) {\n    this.name = name;\n    this.playerBoard = playerBoard;\n    this.opponentBoard = opponentBoard;\n  }\n\n  // let player place 5 ships\n  placePlayerShip(start, length, axis) {\n    if (this.playerBoard.ships.length < 5) {\n      this.playerBoard.placeShip(start, length, axis);\n    }\n  }\n\n  // player takes their shot at opponent's board\n  playTurn(index) {\n    const notAttemptedBefore = !this.opponentBoard.cells[index].attempted;\n    if (notAttemptedBefore) {\n      this.opponentBoard.attack(index);\n    } else {\n      console.log(\"You have already taken a shot here!\");\n    }\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Ship {\n  constructor(positions) {\n    this.positions = positions;\n    this.length = positions.length;\n    this.hits = [];\n  }\n\n  hit(position) {\n    if (this.hits.includes(position)) return;\n    this.hits.push(position);\n  }\n\n  isSunk() {\n    return this.hits.length === this.length;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass GameUI {\n  constructor(player, opponent) {\n    this.player = player;\n    this.opponent = opponent;\n\n    this.initEmptyBoards();\n    this.initPlayerBoard(this.player);\n  }\n\n  initEmptyBoards() {\n    const boards = document.querySelectorAll(\".board\");\n\n    boards.forEach((board) => {\n      for (let i = 0; i < 100; i++) {\n        const cell = document.createElement(\"div\");\n        cell.className = \"cell\";\n        cell.dataset.index = i;\n        board.appendChild(cell);\n      }\n    });\n  }\n\n  initPlayerBoard(player) {\n    const playerCells = player.playerBoard.cells;\n    const playerBoardElement = document.querySelector(\".player-board\");\n\n    // loop through player cells array\n    playerCells.forEach((cell, index) => {\n      const cellElement = playerBoardElement.querySelector(\n        `.cell[data-index='${index}']`\n      );\n      // display players ships\n      if (cell.occupied) cellElement.classList.add(\"ship\");\n    });\n  }\n\n  // this is called after every turn\n  updateBoards(player, opponent) {\n    this.updatePlayerBoard(player);\n    this.updateOpponentBoard(opponent);\n  }\n\n  updatePlayerBoard(player) {\n    const playerCells = player.playerBoard.cells;\n    const playerBoardElement = document.querySelector(\".player-board\");\n\n    // loop through player cells array\n    playerCells.forEach((cell, index) => {\n      const cellElement = playerBoardElement.querySelector(\n        `.cell[data-index='${index}']`\n      );\n      // mark as attempted\n      if (cell.attempted) cellElement.classList.add(\"dot\");\n      // if opponent hits a ship\n      if (cell.occupied) cellElement.classList.add(\"hit-ship\");\n    });\n  }\n\n  updateOpponentBoard(opponent) {\n    const opponentCells = opponent.opponentBoard.cells;\n    const opponentBoardElement = document.querySelector(\".opponent-board\");\n\n    opponentCells.forEach((cell, index) => {\n      const cellElement = opponentBoardElement.querySelector(\n        `.cell[data-index='${index}']`\n      );\n      // mark as attempted\n      if (cell.attempted) cellElement.classList.add(\"dot\");\n    });\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameUI);\n\n\n//# sourceURL=webpack://battleship/./src/ui.js?");

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