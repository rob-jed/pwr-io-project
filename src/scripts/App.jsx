import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from 'data/store';
import LoaderOverlay from 'components/LoaderOverlay';
import Routes from 'components/Routes';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LoaderOverlay />
        <Routes />
      </Provider>
    );
  }
}

export default App;
