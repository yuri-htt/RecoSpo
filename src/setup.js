import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './app';
import configureStore from './redux/configureStore';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
