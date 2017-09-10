import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modalbox';

import config from '../../../lib/config';

export default class CommonModal extends Component {
  state = {
    alertModalVisible: false,
  }

  render() {
    const {
      auth,
      actions,
      onClosed,
    } = this.props;

    return (
      <Modal
        style={styles.alertModal}
        isOpen={true}
        onClosed={() => actions.change(`${onClosed}`, false )}
      >
        <Text style={styles.alertModalTxt}>{this.state.errorMessage}</Text>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  alertModal: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  alertModalTxt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: config.transparent,
  },
});
