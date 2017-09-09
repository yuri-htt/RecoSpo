import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Divider } from 'react-native-material-design';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';

import SignupModal from './components/signup';
import CommonModal from './components/common/modal';
import { Tabs } from './tabs/router';
import config from '../lib/config';

import * as AuthActions from './redux/modules/auth';
import * as ModalActions from './redux/modules/modal';

const Realm = require('realm');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export class App extends Component {
  componentWillMount() {
		this.props.actions.hasUserData();
  }

  render() {
    return (
      <View style={styles.scene}>
				<SignupModal />
				<CommonModal />
				<Tabs />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
})

export default connect(
  state => ({ ...state }),
  dispatch => ({
    actions: bindActionCreators({
		...AuthActions,
		...ModalActions,
    }, dispatch),
  }),
)(App);
