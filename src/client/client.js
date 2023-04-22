// note - Entry Point to our client side app to Bind Event handlers or run js code in html page by React

import React from 'react';
import ReactDOM from 'react-dom';

import Home from './components/Home';

// note - render Home component in the same DIV on Server which is already rendered DOM
// Not replacing any htm elements here, just setting up or binding all the Event Handlers with React

// note - The process of rendering html again that is already one rendered is known as Hydration.
// We should use .hydrate instead of .render method
ReactDOM.hydrate(<Home />, document.querySelector('#root'));

// note - we rendered the app ONCE in the SERVER & run javascript code in the browser
// The process of rendering html again that is already one rendered is known as Hydration.
