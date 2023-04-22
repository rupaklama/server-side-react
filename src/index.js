import express from 'express';
import React from 'react';

// using renderToString func to render React Components into HTML on the Client
// const renderToString = require('react-dom/server').renderToString;
import { renderToString } from 'react-dom/server';

// const Home = require('./client/components/Home').default;
import Home from './client/components/Home';

const app = express();

// serve our public dir in the current root dir to the browser
// Middleware to server Static files from local directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  // note - passing a react component here just as in ReactDom.render()
  const content = renderToString(<Home />);

  //  Note: whenever we load up html page in the browser, we will make sure
  // that Html document has Script tag inside of it which instructs the Browser
  // to go back & access the Client Side bundle to use javaScript code for ui interaction

  // note - step 1: First on Server Side, index.js does initial render of html page
  // step 2: On the Client Side, Binding of Event handlers is done on html page by React in the DOM

  const html = `
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

  res.status(200).send(html);
});

app.listen(2000, () => {
  console.log('listening @ port 2000!');
});
