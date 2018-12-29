import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from 'components/AuthRoute';
import { route } from 'services/URL';
import loadChunk from './services/loadChunk';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          noAuth
          path={route('/')}
          render={loadChunk('/')}
        />
        <Route
          noAuth
          path={route('login')}
          render={loadChunk('login')}
        />
        <Route
          path={route('admin')}
          render={loadChunk('admin')}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
