'use strict';

import {
  AppRegistry,
  UIManager,
} from 'react-native';

import React, { Component } from 'react';
import Root from './src/containers/root';

export default class App extends Component {
    render() {
      return (
        <Root />
      );
    }
  }