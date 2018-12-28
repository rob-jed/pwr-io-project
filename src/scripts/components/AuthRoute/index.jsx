import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { route } from 'services/URL';
import { isLoggedIn } from 'services/User';

function AuthRoute(props) {
  const { path, noAuth } = props;

  // If user isn't logged in and he tries to access private route redirect him to login page
  if (!noAuth && !isLoggedIn()) {
    return <Redirect to={route('login')} />;
  }

  // When user is logged in he shouldn't be able to see login page.
  if (isLoggedIn() && path === '/login') {
    return <Redirect to={route('/')} />;
  }

  return <Route {...props} />;
}

export default AuthRoute;
