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

import SignupModal from './components/signup';
import CommonModal from './components/common/modal';
import { Tabs } from './tabs/router';

import { actions as FormActions } from 'react-redux-form';
import * as AuthActions from './redux/modules/auth';
import * as ModalActions from './redux/modules/modal';

export class App extends Component {
  componentWillMount() {
    this.props.actions.hasUserData();
  }

  render() {
    const {
      auth,
    } = this.props;
    console.log(this)
    return (
      <View style={styles.scene}>
        <SignupModal {...this.props} />
        {auth.alertModalVisible &&
          <CommonModal
            onClosed={'auth.alertModalVisible'}
            {...this.props}
          />
        }
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
    ...FormActions,
    ...AuthActions,
    ...ModalActions,
    }, dispatch),
  }),
)(App);
