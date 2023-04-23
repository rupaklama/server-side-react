import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from '../actions';

const UsersList = () => {
  const { users } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const renderUsers = () =>
    users.map((user) => <li key={user.id}>{user.name}</li>);

  return (
    <div>
      Here's a big list of users:
      <ul>{renderUsers()}</ul>
    </div>
  );
};

// loadData is Custom Function to load data for each Component.
// Similar to getServerSideProps in Next JS
// note - loadData function has access to Server Redux Store
function loadData(store) {
  // dispatch action creator for data fetching on the server side & wait for promise to resolve
  // Once we have data in our server redux store, only then render our app
  return store.dispatch(fetchUsers());
}

export { loadData };
export default UsersList;
