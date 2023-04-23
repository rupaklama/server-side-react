import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// sharing same reducer on the Client side
import reducers from '../client/reducers';

// note - This is Server Side Redux Store behaves slightly different than the Client side
// NOTE: The Goal is to send HTML page back to the Browser after all our data fetching
// is complete on the Server Side Redux Store.
// After doing Store initialization & data loading inside of index.js
// then we will pass Redux Store into the 'renderer' func where it can be use by the Provider function.
export default () => {
  const store = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};

// note - next step is to export above function & add it somewhere in the React app on the Server Side
// We are going to place it inside of index.js file
