import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as FormActions } from 'react-redux-form';

import SignupModal from './components/signup';
import CommonModal from './components/common/modal';
import { Tabs } from './tabs/router';

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
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export default connect(
  state => ({ ...state }),
  dispatch => ({
    actions: bindActionCreators({
      ...FormActions,
      ...AuthActions,
      ...ModalActions,
    }, dispatch),
  })
)(App);
