import React from 'react';

// <StaticRouter> is used to render a React Router web app in node.
import { StaticRouter } from 'react-router-dom';

// using renderToString func to render React Components into HTML on the Client
import { renderToString } from 'react-dom/server';

import { Provider } from 'react-redux';

// takes array of route objects
import { renderRoutes } from 'react-router-config';

import Routes from '../client/Routes';

// note - template to render react app to return as string - html
// This helps to separate out react code from server code
export default (req, store) => {
  // note - passing a react component here just as in ReactDom.render()
  const content = renderToString(
    // note - Provide context prop to handle redirects & error handling
    // Provide the current location via the location prop to get url path with express
    <Provider store={store}>
      <StaticRouter context={{}} location={req.url}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  //  Note: whenever we load up html page in the browser, we will make sure
  // that Html document has Script tag inside of it which instructs the Browser
  // to go back & access the Client Side bundle to use javaScript code for ui interaction

  // note - step 1: First on Server Side, index.js does initial render of html page in the browser
  // step 2: On the Client Side, Binding of Event handlers is done on html page by React in the DOM with bundle.js

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Server Side Rendering</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script src="bundle.js"></script>
    </body>
    </html>
  `;
};
