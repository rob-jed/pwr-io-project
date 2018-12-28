import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isLoggedIn } from 'services/User';

function AuthRoute(props) {
  if (!isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
}

export default AuthRoute;
