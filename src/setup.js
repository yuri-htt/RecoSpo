'use strict';

import React, { Component } from 'react';
import App from './app';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

// Import the store created in configureStore.js
const store = configureStore();

export default class Root extends Component {

  render() {
    return (
      // Connect the App component to this new redux API Client Store
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}
