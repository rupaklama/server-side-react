// note - Entry Point to our client side app to Bind Event handlers or run js code in html page by React

import React from 'react';
// generatorRuntimeError - to avoid this babel error on using async await syntax
// this will define some of the helpers func babel wants to use
import 'babel-polyfill';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// takes array of route objects
import { renderRoutes } from 'react-router-config';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

// note - we will have TWO Redux Stores for Client Side & Server Side
const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

import Routes from './Routes';

// note - render Home component in the same DIV on Server which is already rendered in DOM
// Not replacing any htm elements here, just setting up or binding all the Event Handlers with React

// note - The process of rendering html again that is already one rendered is known as Hydration.
// We should use .hydrate instead of .render method
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);

// note - we rendered the app ONCE in the SERVER & second render in the browser to run javascript code
