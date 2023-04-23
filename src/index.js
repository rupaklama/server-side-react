// generatorRuntimeError - to avoid this babel error on using async await syntax
// this will define some of the helpers func babel wants to use
import 'babel-polyfill';

import express from 'express';

// using renderToString func to render React Components into HTML on the Client
// const renderToString = require('react-dom/server').renderToString;
// import { renderToString } from 'react-dom/server';

// const Home = require('./client/components/Home').default;
// import Home from './client/components/Home';

import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';

import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

// serve our public dir in the current root dir to the browser
// Middleware to server Static files from local directory
app.use(express.static('public'));

// note - Routing is handled by Routes.js for client & server side
// If a Valid Route, navigate to that path else display option
app.get('*', (req, res) => {
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
  const store = createStore();

  // LOGIC here to detect data loading in Server Redux Store after Action Creators executed
  // note - Need to finish Data fetching first before rendering the app with 'renderer'
  // The GOAL is to send HTML page back to the Browser after all our data fetching is complete

  // 1. First, based on Request URL we need to figure out what set of Components need to be Rendered
  // To make this possible, we will be using React Router Config Library's matchRoutes function
  // first takes Array of Routes & second arg is current user request url
  // matchRoutes checks out the Route the user is trying to visit & return array of Components to render
  const promises = matchRoutes(Routes, req.path)
    // console.log(matchRoutes(Routes, req.path))

    // 2 .now for each of the components that user is trying to access,
    // we are going to define custom 'loadData' function that
    // defines all the data that Component needs to be rendered in the ui.
    // Custom Function that is attached to each of the Component is to INITIATE Data Loading process.
    // loadData func is Custom Function to load data for each Component. Similar to getServerSideProps in Next JS
    // NOTE - After Routes get matched by matchRoutes, initiate data loading process by calling loadData
    .map(({ route }) => {
      // call loadData if route component has one in it
      // loadData(store) - all loadData functions will have reference to Server Redux Store
      return route.loadData ? route.loadData(store) : null;
    });

  // 3. Wait for response
  // 4. Detect all requests are complete
  Promise.all(promises)
    .then(() => {
      // 5. Render the app with the collected data
      // 6. Send result back to the browser

      // note - The Pros is that Only render the app once & makes data requirements of each component clear
      // Cons - requires a ton of extra customize code

      // note - passing Request object for Routing & Server Redux Store here
      res.status(200).send(renderer(req, store));
    })
    .catch((err) => console.error(err));
});

app.listen(2000, () => {
  console.log('listening @ port 2000!');
});
