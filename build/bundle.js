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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(18);

var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _reactRouterConfig = __webpack_require__(19);

var _Routes = __webpack_require__(6);

var _Routes2 = _interopRequireDefault(_Routes);

var _renderer = __webpack_require__(4);

var _renderer2 = _interopRequireDefault(_renderer);

var _createStore = __webpack_require__(9);

var _createStore2 = _interopRequireDefault(_createStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// using renderToString func to render React Components into HTML on the Client
// const renderToString = require('react-dom/server').renderToString;
// import { renderToString } from 'react-dom/server';

// const Home = require('./client/components/Home').default;
// import Home from './client/components/Home';

// generatorRuntimeError - to avoid this babel error on using async await syntax
// this will define some of the helpers func babel wants to use
var app = (0, _express2.default)();

// serve our public dir in the current root dir to the browser
// Middleware to server Static files from local directory
app.use(_express2.default.static('public'));

// note - Routing is handled by Routes.js for client & server side
// If a Valid Route, navigate to that path else display option
app.get('*', function (req, res) {
  // note - passing a react component here just as in ReactDom.render()
  // const content = renderToString(<Home />);

  //  Note: whenever we load up html page in the browser, we will make sure
  // that Html document has Script tag inside of it which instructs the Browser
  // to go back & access the Client Side bundle to use javaScript code for ui interaction

  // note - step 1: First on Server Side, index.js does initial render of html page
  // step 2: On the Client Side, Binding of Event handlers is done on html page by React in the DOM

  // const html = `
  //   <!DOCTYPE html>
  //   <html lang="en">
  //   <head>
  //     <meta charset="UTF-8" />
  //     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //     <title>Server Side Rendering</title>
  //   </head>
  //   <body>
  //     <div id="root">${content}</div>
  //     <script src="bundle.js"></script>
  //   </body>
  //   </html>
  // `;

  // Store initialization
  var store = (0, _createStore2.default)();

  // LOGIC here to detect data loading in Server Redux Store after Action Creators executed
  // note - Need to finish Data fetching first before rendering the app with 'renderer'
  // The GOAL is to send HTML page back to the Browser after all our data fetching is complete

  // 1. First, based on Request URL we need to figure out what set of Components need to be Rendered
  // To make this possible, we will be using React Router Config Library's matchRoutes function
  // first takes Array of Routes & second arg is current user request url
  // matchRoutes checks out the Route the user is trying to visit & return array of Components to render
  var promises = (0, _reactRouterConfig.matchRoutes)(_Routes2.default, req.path)
  // console.log(matchRoutes(Routes, req.path))

  // 2 .now for each of the components that user is trying to access,
  // we are going to define custom 'loadData' function that
  // defines all the data that Component needs to be rendered in the ui.
  // Custom Function that is attached to each of the Component is to INITIATE Data Loading process.
  // loadData func is Custom Function to load data for each Component. Similar to getServerSideProps in Next JS
  // NOTE - After Routes get matched by matchRoutes, initiate data loading process by calling loadData
  .map(function (_ref) {
    var route = _ref.route;

    // call loadData if route component has one in it
    // loadData(store) - all loadData functions will have reference to Server Redux Store
    return route.loadData ? route.loadData(store) : null;
  });

  // 3. Wait for response
  // 4. Detect all requests are complete
  Promise.all(promises).then(function () {
    // 5. Render the app with the collected data
    // 6. Send result back to the browser

    // note - The Pros is that Only render the app once & makes data requirements of each component clear
    // Cons - requires a ton of extra customize code

    // note - passing Request object for Routing & Server Redux Store here
    res.status(200).send((0, _renderer2.default)(req, store));
  }).catch(function (err) {
    return console.error(err);
  });
});

app.listen(2000, function () {
  console.log('listening @ port 2000!');
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _server = __webpack_require__(5);

var _reactRedux = __webpack_require__(12);

var _reactRouterConfig = __webpack_require__(19);

var _Routes = __webpack_require__(6);

var _Routes2 = _interopRequireDefault(_Routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// note - template to render react app to return as string - html
// This helps to separate out react code from server code


// takes array of route objects


// using renderToString func to render React Components into HTML on the Client
exports.default = function (req, store) {
  // note - passing a react component here just as in ReactDom.render()
  var content = (0, _server.renderToString)(
  // note - Provide context prop to handle redirects & error handling
  // Provide the current location via the location prop to get url path with express
  _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _reactRouterDom.StaticRouter,
      { context: {}, location: req.url },
      _react2.default.createElement(
        'div',
        null,
        (0, _reactRouterConfig.renderRoutes)(_Routes2.default)
      )
    )
  ));

  //  Note: whenever we load up html page in the browser, we will make sure
  // that Html document has Script tag inside of it which instructs the Browser
  // to go back & access the Client Side bundle to use javaScript code for ui interaction

  // note - step 1: First on Server Side, index.js does initial render of html page in the browser
  // step 2: On the Client Side, Binding of Event handlers is done on html page by React in the DOM with bundle.js

  return '\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n      <meta charset="UTF-8" />\n      <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n      <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n      <title>Server Side Rendering</title>\n    </head>\n    <body>\n      <div id="root">' + content + '</div>\n      <script src="bundle.js"></script>\n    </body>\n    </html>\n  ';
};

// <StaticRouter> is used to render a React Router web app in node.

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Home = __webpack_require__(7);

var _Home2 = _interopRequireDefault(_Home);

var _UsersList = __webpack_require__(17);

var _UsersList2 = _interopRequireDefault(_UsersList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Note- StaticRouter is included with React Router library for use with Server Side rendering.
// So, when we do the initial rendering of the our app, it is going to be using StaticRouter.
// Then, when our app ships down to the Browser, gets rendered second time - hydrated then
// we will swap out using BrowserRouter instead on the Client Side.

// So, we have ONE ROUTER running in the Server & Another One in the Browser.

// STEPS
// 1. First we are going to create new file - Routes.js on the Client that contains all the different Route Mappings of our app.

// 2. Then, we will import that file in renderer.js in the Server side and also in the Client.js in the Browser

// 3. In the Server, using StaticRouter. On the Client, using BrowserRouter.

// Route Mapping function - different setup require by React Router Config Library
exports.default = [
// array of objects for each route
{
  path: '/',
  component: _Home2.default,
  exact: true
}, {
  loadData: _UsersList.loadData,
  path: '/users',
  component: _UsersList2.default
}]; // note - Browser Router does not work on Server Side

/***/ }),
/* 7 */
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

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(8);

var _reduxThunk = __webpack_require__(10);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxDevtoolsExtension = __webpack_require__(11);

var _reducers = __webpack_require__(13);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// note - This is Server Side Redux Store behaves slightly different than the Client side
// NOTE: The Goal is to send HTML page back to the Browser after all our data fetching
// is complete on the Server Side Redux Store.
// After doing Store initialization & data loading inside of index.js
// then we will pass Redux Store into the 'renderer' func where it can be use by the Provider function.
exports.default = function () {
  var store = (0, _redux.createStore)(_reducers2.default, {}, (0, _reduxDevtoolsExtension.composeWithDevTools)((0, _redux.applyMiddleware)(_reduxThunk2.default)));

  return store;
};

// note - next step is to export above function & add it somewhere in the React app on the Server Side
// We are going to place it inside of index.js file


// sharing same reducer on the Client side

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var compose = __webpack_require__(8).compose;

exports.__esModule = true;
exports.composeWithDevTools =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : function () {
        if (arguments.length === 0) return undefined;
        if (typeof arguments[0] === 'object') return compose;
        return compose.apply(null, arguments);
      };

exports.devToolsEnhancer =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__
    : function () {
        return function (noop) {
          return noop;
        };
      };


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(8);

var _usersReducer = __webpack_require__(14);

var _usersReducer2 = _interopRequireDefault(_usersReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  users: _usersReducer2.default
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = __webpack_require__(15);

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case _actions.FETCH_USERS:
      return action.payload.data;

    default:
      return state;
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchUsers = exports.FETCH_USERS = undefined;

var _axios = __webpack_require__(16);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var FETCH_USERS = exports.FETCH_USERS = 'fetch_users';

// with thunk, we can return a function to handle async action creator
var fetchUsers = exports.fetchUsers = function fetchUsers() {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _axios2.default.get('https://react-ssr-api.herokuapp.com/users');

            case 2:
              response = _context.sent;


              // using dispatch provided by redux thunk to dispatch an action
              dispatch({
                type: FETCH_USERS,
                payload: response
              });

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadData = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(12);

var _actions = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UsersList = function UsersList() {
  var _useSelector = (0, _reactRedux.useSelector)(function (state) {
    return state;
  }),
      users = _useSelector.users;

  var dispatch = (0, _reactRedux.useDispatch)();

  (0, _react.useEffect)(function () {
    dispatch((0, _actions.fetchUsers)());
  }, []);

  var renderUsers = function renderUsers() {
    return users.map(function (user) {
      return _react2.default.createElement(
        'li',
        { key: user.id },
        user.name
      );
    });
  };

  return _react2.default.createElement(
    'div',
    null,
    'Here\'s a big list of users:',
    _react2.default.createElement(
      'ul',
      null,
      renderUsers()
    )
  );
};

// loadData is Custom Function to load data for each Component.
// Similar to getServerSideProps in Next JS
// note - loadData function has access to Server Redux Store
function loadData(store) {
  // dispatch action creator for data fetching on the server side & wait for promise to resolve
  // Once we have data in our server redux store, only then render our app
  return store.dispatch((0, _actions.fetchUsers)());
}

exports.loadData = loadData;
exports.default = UsersList;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("react-router-config");

/***/ })
/******/ ]);