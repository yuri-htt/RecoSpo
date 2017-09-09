'use strict';

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

import { Tabs } from './router';
import config from '../../lib/config';
import pathConfig from '../../lib/pathConfig';

import * as AuthActions from '../redux/modules/auth';

const signUpImg = require('../img/signUp.jpg');
const UserModel = require('../models/user');
const Realm = require('realm');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export class App extends Component {
  state = {
		modalVisible: false,
		userName: 'Your name',
		alertModalVisible: false,
		errorMessage: '',
  }

  componentWillMount() {
    Realm.open({
      schema: [UserModel.User]
    }).then(realm => {
      console.log(realm)
      // TODO:ユーザー名を取得してReduxに保存
      this.setState({modalVisible: false});
    }).catch(error => {
      this.setState({modalVisible: true})
    });
  }

  render() {
    return (
		<View style={styles.scene}>
			{this.renderRegisterModal()}
			<Tabs />
		</View>
    )
  }

  renderRegisterModal() {
    return (
      <Modal
        style={styles.modal}
        isOpen={this.state.modalVisible}
        onClosed={() => this.setState({modalVisible: false})}
      >
        <Image source={signUpImg} style={styles.backGroundImg}>
          <KeyboardAwareScrollView
            style={styles.scene}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.whileScreen}>

              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(userName) => this.setState({userName})}
                  value={this.state.userName}
                />
                <Divider style={styles.border}/>
              </View>

              <TouchableOpacity style={styles.signUpBtn} onPress={() => this.signUp(this.state.userName)}>
                <Text style={styles.signUpTxt}>Sign Up</Text>
              </TouchableOpacity>

			 			 <TouchableOpacity style={styles.try} onPress={() => this.props.actions.signUpSuccess(this.state.userName)}>
                <Text style={styles.signUpTxt}>ACTION CHECK</Text>
              </TouchableOpacity>

							{this.rederAlert()}
            </View>

          </KeyboardAwareScrollView>
        </Image>
      </Modal>
    )
  }

  signUp(userName) {
		let path = `${pathConfig.userSignUp}`;
    let userData = {
      user: {
        nickname: userName
      }
    }

   return fetch(`${path}`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then((response) => {
      if (response.ok || response.status === 200) {
				console.log(response);
        return this.signUpSuccess()
			}
			this.setState({ alertModalVisible: true })
			this.setState({ errorMessage: 'ニックネームを入力してください。'})
      throw errors(response.status);
    })
    .catch((error) => {
			this.setState({ errorMessage: '通信状況をご確認の上、再度お試しください。'})
		})
    .done();
   }

  signUpSuccess() {
		this.setState({ modalVisible: false });
		this.props.actions.signUpSuccess(this.state.userName);
	}

	rederAlert() {
		return (
			<Modal
				style={styles.alertModal}
				isOpen={this.state.alertModalVisible}
				onClosed={() => this.setState({alertModalVisible: false})}
			>
				<Text style={styles.alertModalTxt}>{this.state.errorMessage}</Text>
			</Modal>
		)
	}
}

var styles = StyleSheet.create({
  scene: {
      flex: 1,
  },
  centering: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: 'blue',
  },
  backGroundImg: {
      position: 'absolute',
      top:0,
      left: 0,
      width : screenWidth,
      height: screenHeight,
  },
  whileScreen: {
    width : screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    height:44,
    width: 300,
    marginHorizontal: 20,
  },
  textInput: {
    height:44,
    marginLeft:10,
    color: 'white',
    fontSize: 26,
  },
  border: {
    backgroundColor: 'white',
  },
  signUpBtn: {
    position: 'absolute',
    bottom: 100,
    width: 200,
    height: 40,
    borderRadius:20,
    backgroundColor: config.blueColor,
  },
  signUpTxt: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 40,
    backgroundColor: config.transparent,
  },
  try: {
	position: 'absolute',
    bottom: 50,
    width: 200,
    height: 40,
    borderRadius:20,
	backgroundColor: config.transparent,
	borderWidth: 1,
	borderColor: 'white',
	},
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
})

export default connect(
	state => ({ ...state }),
	dispatch => ({
	  actions: bindActionCreators({
		...AuthActions,
	  }, dispatch),
	}),
)(App);
