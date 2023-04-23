import axios from 'axios';

export const FETCH_USERS = 'fetch_users';

// with thunk, we can return a function to handle async action creator
export const fetchUsers = () => async (dispatch) => {
  const response = await axios.get('https://react-ssr-api.herokuapp.com/users');

  // using dispatch provided by redux thunk to dispatch an action
  dispatch({
    type: FETCH_USERS,
    payload: response,
  });
};
