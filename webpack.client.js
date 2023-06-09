const path = require('path');

// note - Client Side bundle with Javascript code so user can interact

// note - Webpack config to run Babel & build Bundle with all modules before Node executes any code in client.js
// This allows us to run JSX on our server, converted to regular js code to be executed by node js
module.exports = {
  // telling webpack the root file of our Client side codebase
  entry: './src/client/client.js',

  // telling webpack where to put the output file after generated
  output: {
    filename: 'bundle.js',
    // public dir is automatically created in our working dir which is accessible publicly in the browser
    path: path.resolve(__dirname, 'public'),
  },

  // telling webpack to run Babel to compile JSX on every modules
  module: {
    rules: [
      {
        // regex to run Babel only in js files
        test: /\.js?$/,

        // webpack loader module to execute Babel & transpile code
        loader: 'babel-loader',

        // webpack to ignore modules in particular dir with regex here
        exclude: /node_modules/,

        // option objects
        options: {
          // rules for Babel to transpile modules
          presets: [
            // jsx into regular js
            'react',

            // to handle async code
            'stage-0',

            // master preset that webpack uses to run all different transform rules
            // needed to meet the requirements of the latest two versions of all popular browsers
            ['env', { targets: { browsers: ['last 2 versions'] } }],
          ],
        },
      },
    ],
  },
};
