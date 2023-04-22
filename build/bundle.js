/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(2);

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(3);

var _Home = __webpack_require__(4);

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// using renderToString func to render React Components into HTML on the Client
// const renderToString = require('react-dom/server').renderToString;
var app = (0, _express2.default)();

// serve our public dir in the current root dir to the browser
// Middleware to server Static files from local directory


// const Home = require('./client/components/Home').default;
app.use(_express2.default.static('public'));

app.get('/', function (req, res) {
  // note - passing a react component here just as in ReactDom.render()
  var content = (0, _server.renderToString)(_react2.default.createElement(_Home2.default, null));

  //  Note: whenever we load up html page in the browser, we will make sure
  // that Html document has Script tag inside of it which instructs the Browser
  // to go back & access the Client Side bundle to use javaScript code for ui interaction

  // note - step 1: First on Server Side, index.js does initial render of html page
  // step 2: On the Client Side, Binding of Event handlers is done on html page by React in the DOM

  var html = '\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n      <meta charset="UTF-8" />\n      <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n      <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n      <title>Server Side Rendering</title>\n    </head>\n    <body>\n      <div id="root">' + content + '</div>\n      <script src="bundle.js"></script>\n    </body>\n    </html>\n  ';

  res.status(200).send(html);
});

app.listen(2000, function () {
  console.log('listening @ port 2000!');
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function Home() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      null,
      'Home works now'
    ),
    _react2.default.createElement(
      'button',
      { onClick: function onClick() {
          return console.log('hi there');
        } },
      'Press me'
    )
  );
};
exports.default = Home;

/***/ })
/******/ ]);