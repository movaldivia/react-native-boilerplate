import React from 'react';
import {useSelector} from 'react-redux';
import Login from '../login/login';
import Profile from '../profile/profile';

const HomePage = () => {
  const currentUser = useSelector((state) => {
    return state.auth.user;
  });

  if (currentUser) {
    return <Profile />;
  } else {
    return <Login />;
  }
};

export default HomePage;
