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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\");\n\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

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