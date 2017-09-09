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
import Modal from 'react-native-modalbox';

import config from '../../lib/config';

const signupImg = require('../img/signup.jpg');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class SignupModal extends Component {
  state = {
    modalVisible: false,
    userName: 'Your name',
    alertModalVisible: false,
    errorMessage: '',
  }
  
  render() {
    const {
      auth,
      actions,
    } = this.props;

    return (
      <Modal
        style={styles.modal}
        isOpen={auth === undefined ? true : auth.signupModalVisible}
        onClosed={() => actions.change('auth.signupModalVisible', false)}
      >
        <Image source={signupImg} style={styles.backGroundImg}>
          <KeyboardAwareScrollView
            style={styles.scene}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.whileScreen}>

              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={userName => this.setState({ userName })}
                  value={this.state.userName}
                  onFocus={() => this.setState({ userName : '' })}
                />
                <Divider style={styles.border} />
              </View>

              <TouchableOpacity style={styles.signupBtn} onPress={() => actions.signup(this.state.userName)}>
                <Text style={styles.signupTxt}>Sign Up</Text>
              </TouchableOpacity>

            </View>

          </KeyboardAwareScrollView>
        </Image>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  backGroundImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
  },
  whileScreen: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    height: 44,
    width: 300,
    marginHorizontal: 20,
  },
  textInput: {
    height: 44,
    marginLeft: 10,
    color: 'white',
    fontSize: 26,
  },
  border: {
    backgroundColor: 'white',
  },
  signupBtn: {
    position: 'absolute',
    bottom: 100,
    width: 200,
    height: 40,
    borderRadius: 20,
    backgroundColor: config.blueColor,
  },
  signupTxt: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 40,
    backgroundColor: config.transparent,
  },
});
