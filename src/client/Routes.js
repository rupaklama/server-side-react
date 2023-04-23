// note - Browser Router does not work on Server Side
import React from 'react';

import Home from './components/Home';

import UsersList, { loadData } from './components/UsersList';

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
export default [
  // array of objects for each route
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    loadData: loadData,
    path: '/users',
    component: UsersList,
  },
];
